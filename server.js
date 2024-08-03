const http = require('http');
const next = require('next');
const { parse } = require('url');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Send a message every 5 seconds
    const interval = setInterval(() => {
      socket.send(`Key: ${socket.handshake.query.key}`);
    }, 5000);

    socket.on('disconnect', () => {
      clearInterval(interval);
      console.log('A user disconnected');
    });
  });

  server.listen(3001, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3001');
  });
});
