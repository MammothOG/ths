const playerRequestBuilder = (data, playlist) => {
  let req = {};
  if ('status' in data) { req.status = data.status; }
  if ('volume' in data) { req.volume = data.volume; }
  if ('time' in data) { req.time = data.time; }

  if (playlist.length > 0) {
    if ("move" in data && playlist.length > 1) {
      switch (data.move) {
        case "next":
          playlist.shift();
          break;
        case "end":
          playlist = [playlist[playlist.length - 1]];
          break;
      }
    }
    req.media = playlist[0];
  }
  return req;
}

exports.playerRequestBuilder = playerRequestBuilder