const crypto = require("crypto");
const moment = require("moment");

export const errorHandler = (err: any) => {
  if (!err.errors) {
    return {
      code: -1,
      msg: err.message,
      error: err,
    };
  }
  const eMsg = err.errors.map((e: any) => {
    return e.message;
  });
  console.log(eMsg);
  return {
    code: -1,
    error: {
      name: err.name,
      errors: eMsg,
    },
  };
};

export const getType = (obj: any) => {
  let objType = Object.prototype.toString.call(obj);
  if (objType === '[object String]') {
    return 'String';
  } else if (objType === '[object Array]') {
    return 'Array';
  } else if (objType === '[object Object]') {
    return 'Object';
  } else if (objType === '[object Function]') {
    return 'Function';
  } else if (objType === '[object Undefined]') {
    return 'Undefined';
  } else if (objType === '[object Null]') {
    return 'Null';
  }
};

export const successHanlder = (options: any) => {

  if(getType(options) === 'Object') {
    let {
      code, data, msg, errCode
    } = options;
    return {
      code: code || 0,
      data,
      msg: msg || 'no messages',
      errCode: errCode || '0000'
    }
  }else {
    return {
      code: 0,
      data: options,
      msg: 'no messages',
      errCode: '0000'
    }
  }
}

export const generateRandomCode = (length = 6) => {
  let buffer = crypto.randomBytes(4);
  const hex = buffer.toString("hex");
  const integer = parseInt(hex, 16);
  let integerString = integer + "";
  if (integerString.length < length) {
    return (
      new Array(length - integerString.length).fill(Math.floor(Math.random() * 10)).join("") +
      integerString
    );
  } else {
    let codeString = (integer + "").substr(0, length);
    console.log(codeString);
    return codeString;
  }
};

export const vrfCodeExpired = ({ time_before, time_after, minutes = 10 }: any) => {
  let _time_after;
  if (!time_after) {
    _time_after = new Date();
  } else {
    _time_after = time_after;
  }
  const afterTime = moment(_time_after);

  let compareMoment = afterTime.subtract(minutes, "minutes");
  // let diff = moment().diff(modifiedTime);
  let diff = compareMoment.diff(time_before);

  let beforeTimestamp = moment(time_before).format('YYYY-MM-DD HH:mm:ss');
  let afterTimestamp = compareMoment.format('YYYY-MM-DD HH:mm:ss');
  console.log(beforeTimestamp, afterTimestamp, ' - - - - - - time stamp');

  console.log();
  if (diff < 0) {
    return false;
  } else {
    return true;
  }
};


export const apolloErrorHandler = ({
  error,
  mapping
}:any) => {
  if (error.graphQLErrors) {
    console.log(error.graphQLErrors, ' - -  -')
    let errorMsg = '';
    for (let i = 0; i < error.graphQLErrors.length; i++) {
      let err = error.graphQLErrors[i];
      if (err.extensions && err.extensions.errcode) {
        const errcode = err.extensions.errcode;
        if (mapping) {
          errorMsg = mapping[errcode];
          break;
        }
      }
    }
    return errorMsg;
  }
}
