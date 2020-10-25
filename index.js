const express = require('express');
  const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const R = require('ramda');

const { PORT } = require('./config');
const { isDataFormatCorrect } = require('./checker')


app.use(express.static("public"));
app.use(express.json());

const postHandler_ = R.curry(async (fn, req, res) => {
  const response = await R.pipe(fn)(req, res);
  
  if (R.has('errorStatus', response)) {
    ctx.throw("o shit ramda shit");
  }
});

const remoteHandler = (req, res) => {
  console.log("Receive post request");
  const data = req.body;

  if (isDataFormatCorrect(data)) {
    console.log(data);
    io.emit('remote', data);
    res.status(200).send(data);
  }
  else {
    res.status(400).send(data);
  }
}

http.listen(PORT, () => console.log('listening on port:' + PORT));

io.on('connection', (socket) => {
  console.log("socked is connected");
  io.emit('request', "ok");
});

app.post("/remote", postHandler_(remoteHandler));





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