import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../auth/useUser";
import socketIoClient from "socket.io-client";

const ConversationPage = () => {
  const [socket, setSocket] = useState(null);
  const [messageValue, setMessageValue] = useState("");
  const [messages, setMessages] = useState([]);
  const { id: conversationId } = useParams();
  const { user } = useUser();
  const postMessage = async () => {
    socket.emit("postMessage", {
      text: messageValue,
      conversationId,
      query: {
        conversationId,
        token: await user.getIdToken(),
      },
    });
    setMessageValue("");
  };

  useEffect(() => {
    const establishSocketConnection = async () => {
      const socket = socketIoClient("http://127.0.0.1:8080", {
        query: {
          conversationId,
          token: await user.getIdToken(),
        },
      });
      setSocket(socket);
      socket.on("messagesForYou", (conversation) => {
        console.log("Initial Messages Loaded!");
        console.log(conversation);
        setMessages(conversation.messages);
      });
      socket.on("messagesUpdated", (messages) => {
        console.log("Updated messages ...");
        setMessages(messages);
      });
    };
    if (user) {
      establishSocketConnection();
    }

    // return () => socket.disconnect();
  }, []);

  return (
    <div className="centered-container">
      {messages.map((message) => (
        <div key={message._id} className="list-item">
          <h3>{message.postedBy.name}</h3>
          <p>{message.text}</p>
        </div>
      ))}
      <div className="input-form">
        <input
          type="text"
          placeholder="Enter a new message Here"
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
        />
        <button onClick={postMessage}>Send</button>
      </div>
    </div>
  );
};
export default ConversationPage;
