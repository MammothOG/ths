
const isDataFormatCorrect = (data) => {
  let dataFormatCorrect = true;

  if ('session' in data 
  || (Number.isInteger(data.session) 
      && data.session >= 0)) {

    if ('status' in data) {
      if (!(['play', 'pause'].includes(data.status))) {
        console.error("Request argument 'status' is incorrect");
        dataFormatCorrect = false;
      }
    }

    if ('move' in data) {
      if (!(['next', 'previous', 'end'].includes(data.move))) {
        console.error("Request argument 'move' is incorrect");
        dataFormatCorrect = false;
      }
    }
    
    if ('addmode' in data) {
      if (!(['play', 'append'].includes(data.addmode))) {
        console.error("Request argument 'addmode' is incorrect");
        dataFormatCorrect = false;
      }
    }
    
    if ('volume' in data) {
      if (!(Number.isInteger(data.volume))) {
        console.error("Request argument 'volume' is incorrect");
        dataFormatCorrect = false;
      }
    }

    if ('media' in data) {
      if ('service' in data.media) {
        switch (data.media.service) {
          case 'youtube':
            dataFormatCorrect = isYoutubeFormatCorrect(data.media);
            break;
          default:
            console.error("Request argument 'media.service' is unknown");
            dataFormatCorrect = false;
            break;
        }
      }
      else {
        console.error("Request argument 'media.service' does not exist");
        dataFormatCorrect = false;
      }
    }
  }
  else {
    console.error("Request argument 'media.service' is incorrect");
    dataFormatCorrect = false;
  }
  // data use correct format
  console.log("Request format :", dataFormatCorrect)
  return dataFormatCorrect
}

const isYoutubeFormatCorrect = (media, errorOutput) => {
  if ('http' in media) {
    return true
  }
  else {
    console.error("Request argument 'media.service.http' is incorrect")
    return false
  }
}

exports.isDataFormatCorrect = isDataFormatCorrect;