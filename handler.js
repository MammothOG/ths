
remote = (req, res) => {
    console.log("Receive post request");

    res.sendStatus(200);
}

exports.remote = remote;