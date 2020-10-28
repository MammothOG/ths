const express = require('express');
  const app = express();
const R = require('ramda');
const http = require('http').Server(app);

const { PORT } = require('./config');
const { isDataFormatCorrect } = require('./checker')
const { vlcTranslator } = require('./vlcremote')

app.use(express.static("public"));
app.use(express.json());

const postHandler_ = R.curry(async (fn, req, res) => {
  const response = await R.pipe(fn)(req, res);
  
  if (R.has('errorStatus', response)) {
    ctx.throw("o shit ramda shit");
  }
});

const remoteHandler = (req, res) => {
  console.log("Receive post request");
  let data = req.body;

  if (isDataFormatCorrect(data)) {
    vlcTranslator(data);

    res.status(200).send(data);
  }
  else {
    res.status(400).send(data);
  }
}

http.listen(PORT, () => console.log('listening on port:' + PORT));

app.post("/remote", postHandler_(remoteHandler));