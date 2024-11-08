
const axios = require('axios');

let sessionActivity = {};

exports.monitorSession = (req, res, next) => {
    const { sessionId } = req.body;

    if (!sessionId || !sessionActivity[sessionId]) {
        return res.status(401).json({ message: 'Session not found or expired.' });
    }

    const anomalyDetected = detectAnomaly(sessionActivity[sessionId]);
    if (anomalyDetected) {
        console.warn(`Anomaly detected for session: ${sessionId}`);
        return res.status(403).json({ message: 'Unusual activity detected. Re-authentication required.' });
    }

    sessionActivity[sessionId].push(new Date().getTime());
    next();
};

function detectAnomaly(activity) {
    return Math.random() > 0.85; // Simulated anomaly detection logic
}
