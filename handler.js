const { isDataFormatCorrect } = require('./checker');
const { vlcRemote } = require('./vlclaucher');
const { PORT } = require('./config');

const remoteHandler = async (req, res) => {
  console.log("Receive post request");
  let data = req.body;

  if (isDataFormatCorrect(data)) {
    //await vlcRemote(data);

    res.status(200).send(data);
  }
  else {
    res.status(400).send(data);
  }
}

const readyHandler = async () => {
  console.log('listening on port:' + PORT)
}

exports.readyHandler = readyHandler;
exports.remoteHandler = remoteHandler;