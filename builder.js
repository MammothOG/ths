const playerRequestBuilder = (data) => {
  let request = {};
  if ('status' in data) {
    request.status = data.status;
  }
  if ('volume' in data) {
    request.volume = data.volume;
  }
  if ('media' in data) {
    request.media = data.media;
  }

  return request;
}

exports.playerRequestBuilder = playerRequestBuilder