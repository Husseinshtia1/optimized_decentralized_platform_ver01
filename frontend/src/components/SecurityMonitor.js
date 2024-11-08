
import React, { useEffect } from 'react';
import axios from 'axios';

function SecurityMonitor({ sessionId }) {
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                await axios.post('/api/security/monitor', { sessionId });
            } catch (error) {
                console.error('Threat detected or session expired:', error);
                alert('Unusual activity detected. Please re-authenticate.');
            }
        }, 5000); // Monitor every 5 seconds

        return () => clearInterval(interval);
    }, [sessionId]);

    return <div>Monitoring session for unusual activity...</div>;
}

export default SecurityMonitor;
