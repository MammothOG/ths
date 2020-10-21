const { isDataFormatCorrect } = require('./checker')


remote = (req, res) => {
  console.log("Receive post request");
  const data = req.body;

  if (isDataFormatCorrect(data)) {
    res.status(200).send(data);
  }
  else {
    res.status(400).send(data);
  }
}

exports.remote = remote;