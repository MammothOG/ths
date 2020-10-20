playlist = []

const isDataFormatCorrect = (data) => {
  let errorOutput = "";
  let dataFormatCorrect = true;

  if (!('session' in data 
  || (Number.isInteger(data.session) 
  && data.session >= 0))) {
    errorOutput += "session incorrect\n";
    dataFormatCorrect = false;
  }

  if (!('status' in data 
  && data.status in ['play', 'pause'])) {
    errorOutput += "status arg incorrect\n";
    dataFormatCorrect = false;
  }

  if (!('move' in data 
  && data.status in ['next', 'previous', 'start', 'end'])) {
    errorOutput += "move arg incorrect\n";
    dataFormatCorrect = false;
  }

  // data use correct format
  console.warn(errorOutput);
  return true
}

const openSession = () => {

}

remote = (req, res) => {
    console.log("Receive post request");

    console.log(req);
    //isDataFormatCorrect(res.body);

    //openSession();

    res.sendStatus(200);
}

exports.remote = remote;