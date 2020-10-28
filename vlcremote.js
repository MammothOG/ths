const VLC = require("vlc-client");
const vlc = new VLC.Client({
    ip: "localhost",
    port: 8080,
    username: "toto", // optional
    password: "toto"
});

switch (platform()) {
    case "darwin":
        cmd = "/Applications/VLC.app/Contents/MacOS/VLC";
        intf = "macosx";
        break;
    case "linux":
        cmd = "/usr/bin/vlc";
        intf = "qt"
        break;
    default:
        throw new Error(`Platform '${platform()}' is not supported for testing`);
}


const args = [
	"-I", intf,
	"--extraintf", "http",
	"--http-port", "8080",
	"--http-host", "localhost",
	"--http-password","1234",
];

console.log(vlc.status());

const vlcTranslator = (request) => {
    console.log(request);
}

exports.vlcTranslator = vlcTranslator;