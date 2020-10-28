const VLC = require("vlc-client");
const { exec, spawn } = require("child_process");
const { createWriteStream } = require("fs");
const path = require("path");



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


const args = [
    "-I", intf,
    "--extraintf", "http",
    "--http-port", "8080",
    "--http-host", "localhost",
    "--http-password", "1234",
];

exec("export DISPLAY=:0", (error, stdout, stderr) => {
    console.log("exec: export DISPLAY=:0");
});

const spawnVlc = async () => {
    const vlcProcess = spawn(cmd, args, {
        stdio: "pipe"
    });

    console.log(path.join(__dirname, "../vlc.log"))
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

(async () => {
    let vlcProcess = await spawnVlc();
    let vlc = new VLC.Client({
        ip: "localhost",
        port: 8080,
        password: "1234"
    });
    await vlc.playFile('vid/sample.mp4');
})();