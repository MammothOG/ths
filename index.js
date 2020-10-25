const express = require('express');
  const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const R = require('ramda');

const { PORT } = require('./config');
const { isDataFormatCorrect } = require('./checker')
const { mediaParser } = require("./parser")
const { playerRequestBuilder } = require("./builder")


app.use(express.static("public"));
app.use(express.json());

let mediaPlaylist = [];

const postHandler_ = R.curry(async (fn, req, res) => {
  const response = await R.pipe(fn)(req, res);
  
  if (R.has('errorStatus', response)) {
    ctx.throw("o shit ramda shit");
  }
});

const remoteHandler = (req, res) => {
  console.log("Receive post request");
  let data = req.body;

  if (isDataFormatCorrect(data)) {

    // parse the media request and add it to the playlist
    if('media' in data && mediaParser(data)) {

      // mode append/play
      if('addmode' in data) {
        if (data.addmode === 'append') {
          mediaPlaylist.push(data.media);
        }
        else {
          mediaPlaylist.unshift(data.media);
        }
      }

      //console.log(mediaPlaylist);
      //io.emit('remote', data);
    }
    
    let playerReq = playerRequestBuilder(data);
    playerReq.media = mediaPlaylist[0];
    console.log(playerReq);

    res.status(200).send(data);
  }
  else {
    res.status(400).send(data);
  }
}

http.listen(PORT, () => console.log('listening on port:' + PORT));

io.on('connection', (socket) => {
  console.log("socked is connected");
  io.emit('request', 200);
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