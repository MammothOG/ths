const mediaRequestParser = (data) => {
    let dataParsed = data;

    switch (data.media.service) {
        case "youtube":
            youtubeParser(dataParsed.media)
            break;
    
        default:
            break;
    }
    return dataParsed;
}

const youtubeParser = (media) => {
    media.http = "test";
}

exports.mediaRequestParser = mediaRequestParser;