// This the middleware which is used to check the token send by the user
// This will be checked before accessing the endpoint

import * as admin from "firebase-admin";

export const protectRouteMiddleware = async (req, res, next) => {
  console.log("checking user");
  try {
    const token = req.headers.authtoken;
    const user = await admin.auth().verifyIdToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "You must be logged in to access these end points!",
    });
  }
};
