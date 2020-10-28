const express = require('express');
  const app = express();

const { PORT } = require('./config');
const { remoteHandler, readyHandler } = require('./handler')


app.use(express.static("public"));
app.use(express.json());

app.listen(PORT, readyHandler);
app.post("/remote", remoteHandler);