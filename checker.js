
const isDataFormatCorrect = (data) => {
  let dataFormatCorrect = true;

  if ('status' in data) {
    if (!(['play', 'pause'].includes(data.status))) {
      console.error("Request argument 'status' is incorrect");
      return false
    }
  }

  if ('move' in data) {
    if (!(['next', 'previous', 'end'].includes(data.move))) {
      console.error("Request argument 'move' is incorrect");
      return false
    }
  }

  if ('volume' in data) {
    if (!(Number.isInteger(data.volume))) {
      console.error("Request argument 'volume' is incorrect");
      return false
    }
  }

  if ('time' in data) {
    if (!(Number.isInteger(data.time))) {
      console.error("Request argument 'time' is incorrect");
      return false
    }
  }

  if ('addmode' in data) {
    if (!(['play', 'append'].includes(data.addmode))) {
      console.error("Request argument 'addmode' is incorrect");
      return false
    }
  }


  if ('media' in data) {
    if (!(['youtube', 'local'].includes(data.media.service))) {
      console.error("Request argument 'media.service' is unknown");
      return false
    }

    // TODO modify to adapt to service
    if(!('path' in data.media)) {
      console.error("Request argument 'media.path' is unknown");
      return false
    }

    if ('starttime' in data.media) {
      if (!(Number.isInteger(data.media.starttime))) {
        console.error("Request argument 'media.startime' is incorrect");
        return false
      }
    }
  }
  // data use correct format
  console.log("Request format :", dataFormatCorrect)
  return dataFormatCorrect
}

exports.isDataFormatCorrect = isDataFormatCorrect;