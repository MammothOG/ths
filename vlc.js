const VLC = require("vlc-client");

const { VLC_HTTP_HOST, VLC_HTTP_PORT, VLC_HTTP_PASSWORD } = require("./config");
const { spawnVlc } = require("./vlclaucher");


let vlcProcess;
let vlc;

const startVlc = async () => {
    console.log('Starting VLC');
    vlcProcess = await spawnVlc();

    vlc = new VLC.Client({
        ip: VLC_HTTP_HOST,
        port: VLC_HTTP_PORT,
        password: VLC_HTTP_PASSWORD
    });
}

const updateVlc = async (request) => {
    if (request.media !== undefined) {
        switch (request.media.position) {
            case "end":
                await vlc.addToPlaylist(request.media.path);
                break;
            case "next":
                break;
            default:
                await vlc.playFile(request.media.path);
                break;
        }
    }

    // change exec action on the player
    if (request.action !== undefined) {
        switch (request.action) {
            case "play":
                await vlc.play();
                break;
            case "pause":
                await vlc.pause();
                break;
            case 'next':
                await vlc.next();
                break;
            case 'previous':
                await vlc.previous();
                break;
            case 'stop':
                await vlc.stop();
                break;
            case 'clearplaylist':
                await vlc.emptyPlaylist();
                break;
        }
    }

    if (request.volume !== undefined) {
        // change volume
        await vlc.setVolume(request.volume);
    }

    if (request.time !== undefined) {
        // change time
        await vlc.setTime(request.time);

    }

    console.log(await vlc.status())
}

exports.updateVlc = updateVlc;
exports.startVlc = startVlc;