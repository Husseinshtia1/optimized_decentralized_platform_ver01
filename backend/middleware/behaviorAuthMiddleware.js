
let activeSessions = {};

exports.monitorBehavior = (req, res, next) => {
    const { sessionId } = req.headers;
    if (!sessionId || !activeSessions[sessionId]) {
        return res.status(401).json({ message: 'Session expired or unauthorized.' });
    }

    const behaviorData = req.body.behavior;
    const anomaly = detectAnomaly(behaviorData);

    if (anomaly) {
        console.warn(`Anomaly detected for session: ${sessionId}`);
        return res.status(403).json({ message: 'Suspicious activity detected. Please reauthenticate.' });
    }

    next();
};

// Mock anomaly detection logic (replace with AI models)
function detectAnomaly(behaviorData) {
    return Math.random() > 0.8; // Simulating random anomaly detection
}
