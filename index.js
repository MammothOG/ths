const express = require('express');
const app = express();

PORT = 3000;
var requestCount = 0;

app.listen(PORT, () => console.log("listening at " + PORT));

// use html page from public folder
//app.use(express.static('public'));
app.use(express.json())

app.post("/api", (req, rep) => {
    console.log("New post request")
    console.log(req.body);
    console.log(requestCount);
    requestCount = requestCount + 1;
})