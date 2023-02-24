import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyD7tQDNdvljIstFu-AiQTayEfVQNz7Pq24",
  authDomain: "image-sharing-35ae9.firebaseapp.com",
  projectId: "image-sharing-35ae9",
  storageBucket: "image-sharing-35ae9.appspot.com",
  messagingSenderId: "378808276527",
  appId: "1:378808276527:web:360a9b74b1309649c8d8da",
  measurementId: "G-13ZEP4V102",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
