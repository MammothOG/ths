const { exec, spawn } = require("child_process")

const express = require('express');
    const app = express();

const port = 3000;

// setup display
exec("export DISPLAY=:0", (error, stdout, stderr) => {
    console.log("exec: export DISPLAY=:0");
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
});

app.listen(port, () => console.log("Web server running [port = " + port + "]"));

// use html page from public folder
//app.use(express.static('public'));
app.use(express.json());

app.post("/api", (req, res) => {
    console.log("Receive post request");

    const data = req.body;
    switch (data.content.service) {
        case "youtube":
            execute(playYoutubeCmd(data));
            break;
        default:
            console.warn("Service not suported => " + data.content.service);
            break;
    }

    res.sendStatus(200);
});

const playYoutubeCmd = (ytData) => {
    return {
        name: "Play Youtube video",
        command: "cvlc",
        args: ["-f", ytData.content.path],
        status: ytData.params.status,
    }
}

const execute = (cmd) => {
    const shell = spawn(cmd.command, cmd.args);

    shell.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });

    shell.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    shell.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    shell.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
}