const { isDataFormatCorrect } = require('./checker');
const { vlcRemote } = require('./vlc');

const remoteHandler = (req, res) => {
  console.log("Receive post request");
  let data = req.body;

  if (isDataFormatCorrect(data)) {
    //vlcRemote(data);

    res.status(200).send(data);
  }
  else {
    res.status(400).send(data);
  }
}

exports.remoteHandler = remoteHandler;