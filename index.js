const express = require('express');
  const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const R = require('ramda');

const {PORT} = require('./config');
const handler = require('./handler');


app.use(express.static("public"));
app.use(express.json());

const postHandler_ = R.curry(async (fn, ctx) => {
  const response = await R.pipe(fn)(ctx.req, ctx.res);

  if (R.has('errorStatus', response)) {
    ctx.throw("o shit");
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
    //const data = req.body;

    //switch (data.content.service) {
    //    case "youtube":
    //        console.log("receive youtube question")
    //        player.play();
    //        //execute(playYoutubeCmd(data));
    //        break;
    //    default:
    //        console.warn("Service not suported => " + data.content.service);
    //        break;
    //}

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
//const playYoutubeCmd = (ytData) => {
//    // controle vlc --extraintf="rc"
//    return {
//        name: "Play Youtube video",
//        command: "cvlc",
//        args: ["-f", ytData.content.path],
//        status: ytData.params.status,
//    }
//}
//
//const execute = (cmd) => {
//    const shell = spawn(cmd.command, cmd.args);
//
//    shell.stdout.on("data", data => {
//        console.log(`stdout: ${data}`);
//    });
//
//    shell.stderr.on("data", data => {
//        console.log(`stderr: ${data}`);
//    });
//
//    shell.on('error', (error) => {
//        console.log(`error: ${error.message}`);
//    });
//
//    shell.on("close", code => {
//        console.log(`child process exited with code ${code}`);
//    });
//}