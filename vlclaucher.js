const { exec, spawn } = require("child_process");
const { createWriteStream } = require("fs");
const path = require("path");
const { VLC_HTTP_PORT, VLC_HTTP_HOST, VLC_HTTP_PASSWORD } = require("./config");


switch (process.platform) {
    case "darwin":
        cmd = "/Applications/VLC.app/Contents/MacOS/VLC";
        intf = "macosx";
        break;
    case "linux":
        cmd = "/usr/bin/vlc";
        intf = "qt"
        break;
    default:
        throw new Error(`Platform '${process.platform}' is not supported for testing`);
}

const vlcArgs = [
    "-I", "dummy",
    "--extraintf", "http",
    "--http-port", VLC_HTTP_PORT.toString(),
    "--http-host", VLC_HTTP_HOST,
    "--http-password", VLC_HTTP_PASSWORD,
    "--fullscreen"
];

const spawnVlc = async () => {
    const vlcProcess = spawn(cmd, vlcArgs, {
        stdio: "pipe",
        env: { "DISPLAY": ":0"}
    });

    console.log(path.join(__dirname, "vlc.log"))
    const output = createWriteStream(path.join(__dirname, "vlc.log"));
    vlcProcess.stderr.pipe(output);
    vlcProcess.stdout.pipe(output);
    vlcProcess.on("exit", () => {
        output.close();
    })

    console.log([vlcProcess.spawnfile, ...vlcProcess.spawnargs].join(" "));

    return new Promise((res, rej) => {
        const listener = (isError, error) => {
            vlcProcess.stderr.removeListener("data", listener);
            vlcProcess.stdout.removeListener("data", listener);
            vlcProcess.removeListener("error", listener);

            if (isError) {
                rej(error);
                vlcProcess.kill();
            } else {
                setTimeout(() => {
                    res(vlcProcess);
                }, 2000);
            }
        }

        vlcProcess.stdout.on("data", listener.bind(listener, false));
        vlcProcess.stderr.on("data", listener.bind(listener, false));
        vlcProcess.on("error", listener.bind(listener, true));
    })
}

exports.spawnVlc = spawnVlc;

//(async () => {
//    await vlc.playFile('https://www.youtube./watch?v=D5gQ8EFhVSI&ab_channel=Onliner');
//})();