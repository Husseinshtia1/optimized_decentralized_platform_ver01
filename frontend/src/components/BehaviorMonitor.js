
import React, { useState, useEffect } from 'react';

function BehaviorMonitor({ onAnomalyDetected }) {
    const [keystrokes, setKeystrokes] = useState([]);
    const [mouseMovements, setMouseMovements] = useState([]);

    // Capture keystrokes and track timings
    const handleKeyPress = (e) => {
        const time = new Date().getTime();
        setKeystrokes((prev) => [...prev, { key: e.key, time }]);
    };

    // Track mouse movement coordinates
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const time = new Date().getTime();
        setMouseMovements((prev) => [...prev, { x: clientX, y: clientY, time }]);
    };

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        // Detect anomalies by monitoring the collected patterns
        const anomalyDetected = detectAnomalies(keystrokes, mouseMovements);
        if (anomalyDetected) {
            onAnomalyDetected();
        }
    }, [keystrokes, mouseMovements]);

    // Mock anomaly detection logic (replace with ML model in production)
    const detectAnomalies = (keystrokes, mouseMovements) => {
        if (keystrokes.length > 10 && mouseMovements.length > 20) {
            return Math.random() > 0.9; // Random anomaly detection simulation
        }
        return false;
    };

    return <div>Monitoring user behavior...</div>;
}

export default BehaviorMonitor;
