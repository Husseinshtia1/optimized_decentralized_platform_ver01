
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function RealTimeMessaging() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => socket.off('receiveMessage');
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { content: message });
    setMessage('');
  };

  return (
    <div>
      <h2>Real-Time Messaging</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default RealTimeMessaging;
