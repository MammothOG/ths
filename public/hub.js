const socket = io();

// ???
e.preventDefault();
// ???

socket.on('request', function (msg) {
  console.log(msg);
});