import { ethers } from "ethers";
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
  formJStoSol: (ts) => {
    return Math.floor(ts / 1000);
  },
  fromSolToJS: (ts) => {
    return ts * 1000;
  },
  fromDaysToSecs: (day) => {
    return day * 24 * 60 * 60;
  },
  fromEthToWei: (eth) => ethers.utils.parseEther(eth),
  handleBCError: (err) => {
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
  getChainNameFromId: (id) => {
    let chainName = "";
    switch (id) {
      case "1": {
        chainName = "Ethereum main network";
        break;
      }
      case "3": {
        chainName = "Ropsten: Ethereum test network";
        break;
      }
      case "4": {
        chainName = "Rinkeby: Ethereum test network";
        break;
      }
      case "42": {
        chainName = "Koval: Ethereum test network";
        break;
      }
      case "56": {
        chainName = "Binance smart chain main network";
        break;
      }
      case "137": {
        chainName = "Polygon Main network";
        break;
      }
      case "80001": {
        chainName = "Polygon Test network Mumbai";
        break;
      }
      default: {
        chainName = "Your local environment network";
      }
    }
    return chainName;
  },
};
export default utils;
