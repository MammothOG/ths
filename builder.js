const playerRequestBuilder = (data) => {
  let request = {};
  if ('status' in data) {
    request.status = data.status;
  }
  if ('volume' in data) {
    request.volume = data.volume;
  }
  return request;
}

exports.playerRequestBuilder = playerRequestBuilder