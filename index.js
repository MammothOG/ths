const express = require('express');
  const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const R = require('ramda');

const {PORT} = require('./config');
const handler = require('./handler');


app.use(express.static("public"));
app.use(express.json());

const postHandler_ = R.curry(async (fn, req, res) => {
  const response = await R.pipe(fn)(req, res);
  
  if (R.has('errorStatus', response)) {
    ctx.throw("o shit ramda shit");
  }
})

http.listen(PORT,() => {
  console.log('listening on port:' + PORT);
});

io.on('connection', (socket) => {
  console.log("socked is connected");
  io.emit('request', "socked is connected");
});

app.post("/remote", postHandler_(handler.remote));

//const { exec, spawn } = require("child_process");
// setup display
//exec("export DISPLAY=:0", (error, stdout, stderr) => {
//    console.log("exec: export DISPLAY=:0");
//    if (error) {
//        console.log(`error: ${error.message}`);
//        return;
//    }
//    if (stderr) {
//        console.log(`stderr: ${stderr}`);
//        return;
//    }
//});