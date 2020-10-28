const express = require('express');
  const app = express();
const R = require('ramda');

const { PORT } = require('./config');
const { remoteHandler } = require('./handler')


app.use(express.static("public"));
app.use(express.json());

const postHandler_ = R.curry(async (fn, req, res) => {
  const response = await R.pipe(fn)(req, res);
  
  if (R.has('errorStatus', response)) {
    ctx.throw("o shit ramda shit");
  }
});

app.listen(PORT, () => console.log('listening on port:' + PORT));

app.post("/remote", postHandler_(remoteHandler));