const utils = {
  shortHash: (hash) => {
    return `${hash.substring(0, 5)}...${hash.substring(
      hash.length - 4,
      hash.length
    )}`;
  },
  getStringFromTimeStamp: (ts) => {
    const date = new Date(parseInt(ts));
    return `${date.getFullYear()}-${
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`
    }-${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}`;
  },
  getTimeStampFromString: (e) => {
    const [year, month, date] = e.split("-");
    const _date = new Date(year, month - 1, date);
    return _date.getTime().toString();
  },
  handleError: (err) => {
    console.log(err);
    if (err.code === "INVALID_ARGUMENT") {
      return alert(
        "Given input is not a valid input according to the contract !!"
      );
    }
    if (!err.data) {
      const str = err.message.split(":")[1];
      return alert(str);
    }
    const str = err.data.message.split(":")[2];
    return alert(str);
  },
};
export default utils;
