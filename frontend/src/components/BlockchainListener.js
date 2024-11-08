
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BlockchainListener() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/blockchain/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch blockchain events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Blockchain Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event.details}</li>
        ))}
      </ul>
    </div>
  );
}

export default BlockchainListener;
