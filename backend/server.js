
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const errorMiddleware = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/blockchain', require('./routes/blockchainRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

app.use(errorMiddleware);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('sendMessage', (msg) => {
    io.emit('receiveMessage', msg);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
