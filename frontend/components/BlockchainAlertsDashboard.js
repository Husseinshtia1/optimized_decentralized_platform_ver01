
// frontend/components/BlockchainAlertsDashboard.js
import React, { useEffect, useState } from 'react';

const BlockchainAlertsDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  let socket;

  useEffect(() => {
    // Establish WebSocket connection
    socket = new WebSocket('ws://localhost:8080');

    // Handle incoming messages from WebSocket
    socket.onmessage = (event) => {
      setAlerts((prevAlerts) => [...prevAlerts, event.data]);
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="blockchain-alerts-dashboard">
      <h2>Blockchain Alerts Dashboard</h2>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlockchainAlertsDashboard;
