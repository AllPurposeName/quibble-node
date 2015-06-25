const io = require('socket.io').listen(process.env.PORT || 4200);
const redis = require('redis');

const clientSub = redis.createClient();

var connections = 0;

io.on('connection', function (socket) {
  connections++;
  console.log(connections + ' client(s) connected');

  socket.on('disconnect', function () {
    console.log('Someone has disconnected');
    connections--;
  });
});

clientSub.subscribe('channel');

clientSub.on('message', function (channel, message) {
  var msg = JSON.parse(message);
  var clientChannel = io.of('/' + msg.room_slug);
  clientChannel.emit('message', message);
});
