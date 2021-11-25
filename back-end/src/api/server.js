const port = process.env.PORT || 3001;
const app = require('./app');
const { updateStatusIncoming } = require('../controllers/severEvents');

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
            origin: `*`,
        },
});

io.on('connection', (socket) => {
    // let nick = '';
    console.log('fulano entrou');
    socket.on('updateStatus', async ({ status, id }) => {
       const result = await updateStatusIncoming(status, id);
       io.emit('statusUpdated', result);
    });
  });

http.listen(port);
console.log(`Api rodando na porta ${port}`);
