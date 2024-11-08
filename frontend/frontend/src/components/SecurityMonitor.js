
import React, { useEffect } from 'react';
import axios from 'axios';

function SecurityMonitor({ sessionId }) {
    useEffect(() => {
        const monitorSession = async () => {
            try {
                await axios.post('/api/security/monitor', { sessionId });
            } catch (error) {
                console.error('Session monitoring error:', error);
                alert('Anomaly detected. Please re-authenticate.');
            }
        };

        const interval = setInterval(monitorSession, 5000);
        return () => clearInterval(interval);
    }, [sessionId]);  // Dependency fixed

    return <div>Monitoring session...</div>;
}

export default SecurityMonitor;
