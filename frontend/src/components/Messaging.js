
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Messaging() {
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/messages', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
      } catch (error) {
        alert('Failed to fetch messages');
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/messages',
        { recipient, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Message sent successfully');
      setRecipient('');
      setContent('');
    } catch (error) {
      alert('Failed to send message');
    }
  };

  return (
    <div>
      <h2>Messaging</h2>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <textarea
          placeholder="Message content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Send Message</button>
      </form>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.sender}: {msg.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Messaging;
