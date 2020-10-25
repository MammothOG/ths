const url = require('url');


const mediaParser = (data) => {
    let success = true;
    switch (data.media.service) {
        case "youtube":
            success = youtubeParser(data.media)
            break;
    
        default:
            console.error("media.service can not be parsed")
            success = false;
            break;
    }
    console.log("Request parsed :", success)
    return success
}

const youtubeParser = (media) => {
    const query = url.parse(media.http, true).query;
    if (!('v' in query)) {
        console.error('Youtube id not found in the http');
        return false
    }
    media.id = query.v;
    return true
}

exports.mediaParser = mediaParser;