import { combineReducers } from "redux";
import {
  ALERT_MESSAGE,
  CONTRACT_INSTANCE,
  CURRENT_ACCOUNT,
  FLASH_MESSAGE,
  IS_LOGGED_IN,
  JWT_TOKEN,
  LOAD,
  METAMASK_CONNECT_FUNCTION,
  METAMASK_STATUS,
  NETWORK_ID,
  SHOW_ALERT,
  SHOW_FLASH,
  SHOW_LOADER,
  USER_INFO,
} from "./types";

const metamaskStatus = (state = false, action) => {
  if (action.type === METAMASK_STATUS) return action.payload;
  return state;
};
const contractInstance = (state = {}, action) => {
  if (action.type === CONTRACT_INSTANCE) return action.payload;
  return state;
};
const currentAccount = (state = "", action) => {
  if (action.type === CURRENT_ACCOUNT) return action.payload;
  return state;
};
const metamaskConnectFunction = (state = {}, action) => {
  if (action.type === METAMASK_CONNECT_FUNCTION) return action.payload;
  return state;
};
const networkId = (state = "", action) => {
  if (action.type === NETWORK_ID) return action.payload;
  return state;
};
const load = (state = false, action) => {
  if (action.type === LOAD) return action.payload;
  return state;
};
const showLoader = (state = false, action) => {
  if (action.type === SHOW_LOADER) return action.payload;
  return state;
};
const userInfo = (state = {}, action) => {
  if (action.type === USER_INFO) return action.payload;
  return state;
};
const jwtToken = (state = "", action) => {
  if (action.type === JWT_TOKEN) return action.payload;
  return state;
};
const isLoggedIn = (state = false, action) => {
  if (action.type === IS_LOGGED_IN) return action.payload;
  return state;
};
const showAlert = (state = false, action) => {
  if (action.type === SHOW_ALERT) return action.payload;
  return state;
};
const alertMessage = (state = "", action) => {
  if (action.type === ALERT_MESSAGE) return action.payload;
  return state;
};
const showFlash = (state = false, action) => {
  if (action.type === SHOW_FLASH) return action.payload;
  return state;
};
const flashMessage = (state = "", action) => {
  if (action.type === FLASH_MESSAGE) return action.payload;
  return state;
};

export default combineReducers({
  metamaskConnectFunction,
  contractInstance,
  currentAccount,
  metamaskStatus,
  networkId,
  load,
  showLoader,
  jwtToken,
  isLoggedIn,
  userInfo,
  showAlert,
  alertMessage,
  showFlash,
  flashMessage,
});
