const io = require('socket.io').listen(process.env.PORT || 4200);
const redis = require('redis');

const clientSub = redis.createClient();

io.on('connection', function (socket) {
  console.log('Someone has connected');

  socket.on('disconnect', function () {
    console.log('Someone has disconnected');
  });
});

clientSub.subscribe('main_channel');

clientSub.on('message', function (channel, message) {
  io.sockets.emit('message', message);
});
