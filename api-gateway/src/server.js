require('dotenv').config();
const express = require('express');
const http = require('http');
const {initSocket} = require('./socket/socket')
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const socketRoutes = require('./routes/socket.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/socket", socketRoutes)

app.get('/health', (req,res) => res.json({ ok: true, service: 'gateway' }));

const PORT = process.env.PORT;

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => console.log(`API Gateway with Socket.IO running on ${PORT}`));
