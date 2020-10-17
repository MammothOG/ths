const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Web server running [port = ${PORT}]`));

app.use(express.json());
app.use(express.static('public'));
//app.use((req, res) => {
//    res.status(404).send('Unknown Request');
//})


app.post("/api", (req, res) => {
    console.log("Receive post request");

    res.sendStatus(200);
});


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