const socket = io();

socket.on('request', function (msg) {
  console.log(msg);
});