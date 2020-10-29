const VLC = require("vlc-client");

const { VLC_HTTP_HOST, VLC_HTTP_PORT, VLC_HTTP_PASSWORD } = require("./config");
const { spawnVlc } = require("./vlclaucher");


let vlcProcess;
let vlc;

const startVlc = async () => {
    vlcProcess = await spawnVlc();
    vlc = new VLC.Client({
        ip: VLC_HTTP_HOST,
        port: VLC_HTTP_PORT,
        password: VLC_HTTP_PASSWORD
    });
}

const updateVlc = async (request) => {
    console.log(request);
    console.log(await vlc.playFile("./vid/sample.mp4"));
}

exports.updateVlc = updateVlc;
exports.startVlc = startVlc;