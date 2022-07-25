const utils = {
  formJStoSol: (ts) => {
    return Math.floor(ts / 1000);
  },
  fromSolToJS: (ts) => {
    return ts * 1000;
  },
  fromDaysToSecs: (day) => {
    return day * 24 * 60 * 60;
  },
};

module.exports = utils;
