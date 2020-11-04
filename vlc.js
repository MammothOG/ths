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
        if (request.addmode === "append") {
            // add to playlist media
            await vlc.addToPlaylist(request.media.path);
        }
        else {
            // play media 
            await vlc.playFile(request.media.path);
        }
        request.media.service
    }

    // change player state
    switch (request.status) {
        case "play":
            await vlc.play();
            break;
        case "pause":
            await vlc.pause();
            break;
        default:
            break;
    }
    
    // change media
    switch (request.move) {
        case 'next':
            await vlc.next();
            break;
        case 'previous':
            await vlc.previous();
            break;
        case 'end':
        
            break;
        default:
            break;
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