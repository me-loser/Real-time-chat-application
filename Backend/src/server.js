import express from "express";
import http from "http";
import { routes, protectRouteMiddleware } from "./routes";
import * as admin from "firebase-admin";
import socketIo from "socket.io";
import credentials from "./credentials.json";
import { db } from "./db/db";
import { addMessageToConversation } from "./db/addMessageToConversation";
import { getCanUserAccessConversation } from "./db/getCanUserAccessConversation";
import { getConversation } from "./db/getConversation";
import dotenv from "dotenv";
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});
const app = express();

// body-parser can also be used instead of below two lines
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization,AuthToken"
  );
  next();
});

routes.forEach((route) =>
  app[route.method](route.path, protectRouteMiddleware, route.handler)
);
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.use(async (socket, next) => {
  console.log("Veritfying user auth token");
  if (!socket.handshake.query.token) {
    socket.emit("error", "You need to add auth token");
  } else {
    const user = await admin.auth().verifyIdToken(socket.handshake.query.token);

    socket.user = user;

    next();
  }
});
io.on("connection", async (socket) => {
  console.log("A new Client is connected to socket.");
  const conversationId = socket.handshake.query.conversationId;
  const conversation = await getConversation(conversationId);
  socket.emit("messagesForYou", conversation);

  socket.on("postMessage", async ({ text, conversationId }) => {
    const { user_id: userId } = socket.user;
    console.log(text);
    const userIsAuthorized = await getCanUserAccessConversation(
      userId,
      conversationId
    );
    if (userIsAuthorized) {
      await addMessageToConversation(text, userId, conversationId);
      const updatedConversation = await getConversation(conversationId);
      io.emit("messagesUpdated", updatedConversation.messages);
    }
  });
  socket.on("disconnect", () => {
    console.log("Client Disconnected!");
  });
});
const start = async () => {
  await db.connect(process.env.MONGODB_URL);
  server.listen(8080, () => {
    console.log("Server is listening on Port 8080");
  });
};
start();
