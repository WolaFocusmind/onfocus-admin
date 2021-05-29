const imageToBase64 = require('image-to-base64');

const encodeImg = (path) => {
imageToBase64(path)
    .then(
        (response) => {
            console.log(response);
        }
    )
    .catch(
        (error) => {
            console.log(error);
        }
    )
}

const formatArrayToString = (raw) => {
    let stepOne = raw.join(", ");
    let stepTwo = raw ? stepOne.slice(0, 20) + "..." : null;

    return stepTwo;
};

const trimBigText = (raw) => {
    let word = raw.length > 25 ? raw.slice(0, 25) + "..." : raw;
    return word
};

const percentage = (num, per) => {
  return (num/100)*per;
};

module.exports = {
    percentage,
    encodeImg,
    trimBigText,
    formatArrayToString,
}