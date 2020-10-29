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
    await vlc.toggleFullscreen();
}

const updateVlc = async (request) => {
    if (request.media !== undefined) {
        if (request.addmode === "append") {
            // add to playlist media

        }
        else {
            // play media 

        }
        request.media.service
    }

    // change player state
    switch (request.status) {
        case "play":
            
            break;
        case "pause":
            
            break;
    
        default:
            break;
    }
    
    // change media
    switch (request.move) {
        case 'next':
            
            break;
        case 'previous':
            
            break;
        case 'end':
            
            break;
        default:
            break;
    }

    if (request.volume !== undefined) {
        // change volume
        
    }

    if (request.time !== undefined) {
        // change time

    }

    console.log(await vlc.status())
}

exports.updateVlc = updateVlc;
exports.startVlc = startVlc;