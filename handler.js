const { isDataFormatCorrect } = require('./checker')
playlist = []

const openSession = () => {

}

remote = (req, res) => {
    console.log("Receive post request");
    const data = req.body;
    console.log(isDataFormatCorrect(data));

    //openSession();

    res.sendStatus(200);
}

exports.remote = remote;