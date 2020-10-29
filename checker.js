
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
    if ('service' in data.media) {
      switch (data.media.service) {
        case 'youtube':
          if (!isYoutubeFormatCorrect(data.media)) {
            return false
          }
          break;
        default:
          console.error("Request argument 'media.service' is unknown");
          return false
          break;
      }

      if ('starttime' in data.media) {
        if (!(Number.isInteger(data.media.starttime))) {
          console.error("Request argument 'media.startime' is incorrect");
          return false
        }
      }

      // data use correct format
      console.log("Request format :", dataFormatCorrect)
      return dataFormatCorrect
    }
  }
}

const isYoutubeFormatCorrect = (media) => {
  if ('http' in media) {
    return true
  }
  else {
    console.error("Request argument 'media.service.http' is incorrect")
    return false
  }
}

exports.isDataFormatCorrect = isDataFormatCorrect;