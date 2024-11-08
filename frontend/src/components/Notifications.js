
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data);
      } catch (error) {
        alert('Failed to fetch notifications');
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
