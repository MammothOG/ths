const { io } = require('./index')

const remoteHandler = (req, res) => {
  console.log("Receive post request");
  const data = req.body;

  if (isDataFormatCorrect(data)) {
    io.emit('request', "new data");
    res.status(200).send(data);
  }
  else {
    res.status(400).send(data);
  }
}
