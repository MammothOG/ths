const { isDataFormatCorrect } = require('./checker');
const { startVlc, updateVlc } = require('./vlc');
const { PORT } = require('./config');

const remoteHandler = async (req, res) => {
  console.log("Receive post request");
  let request = req.body;

  if (isDataFormatCorrect(request)) {
    //await updateVlc(request);

    res.status(200).send(request);
  }
  else {
    res.status(400).send(request);
  }
}

const readyHandler = async () => {
  console.log('listening on port:' + PORT);
  console.log('lauching VLC')
  // ATTENTION !!!!!!!!!!
  //await startVlc();
}

exports.readyHandler = readyHandler;
exports.remoteHandler = remoteHandler;