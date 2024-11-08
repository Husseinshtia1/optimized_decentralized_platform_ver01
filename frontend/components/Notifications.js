
// frontend/components/Notifications.js
import React, { useEffect, useState } from 'react';

const Notifications = () => {
  const [messages, setMessages] = useState([]);
  let socket;

  useEffect(() => {
    // Establish WebSocket connection
    socket = new WebSocket('ws://localhost:8080');

    // Handle incoming messages
    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="notifications">
      <h2>Real-time Notifications</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
