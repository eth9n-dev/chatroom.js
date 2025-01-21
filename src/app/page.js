"use client";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Create a query that orders the messages by timestamp in ascending order
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("timestamp", "asc") // Order by timestamp in ascending order
    );

    // Real-time listener to fetch messages
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => doc.data());
      setMessages(messagesList);
    });

    // Cleanup function to unsubscribe when the component is unmounted
    return () => unsubscribe();
  }, []); // Empty dependency array to run only once

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessages.trim()) {
      await addDoc(collection(db, "messages"), {
        message: newMessages,
        timestamp: new Date(),
      });

      setNewMessages("");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-orange-100">
      <div className="bg-black flex items-center justify-center rounded-lg w-1/2 h-16">
        <h1 className="text-lime-500 text-3xl">Chatroom.js</h1>
      </div>

      <div className="bg-black flex justify-center rounded-lg w-1/2 h-40 m-4">
        <img src="banner.gif" className="w-full rounded-lg p-2"></img>
      </div>

      <div className="bg-black rounded-lg w-1/2 h-1/2 p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto text-lime-500 text-sm">
          <div className="space-y-2">
            {messages.map((msg, index) => (
              <p key={index}>
                [{new Date(msg.timestamp * 1000).toLocaleString()}]{" "}
                {msg.message}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 flex space-x-2 w-1/2">
        <form onSubmit={sendMessage}>
          <input
            className="bg-black text-lime-500 p-2 rounded mr-2 placeholder-lime-500"
            type="text"
            placeholder="Type a message..."
            value={newMessages} // Bind value to input field
            onChange={(e) => setNewMessages(e.target.value)}
          />
          <button
            className="bg-black hover:bg-black/90 text-lime-500 p-2 rounded"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
