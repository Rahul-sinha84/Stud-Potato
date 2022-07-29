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

export const changeMetamaskStatus = (payload) => ({
  type: METAMASK_STATUS,
  payload,
});
export const changeContractInstance = (payload) => ({
  type: CONTRACT_INSTANCE,
  payload,
});
export const changeCurrentAccount = (payload) => ({
  type: CURRENT_ACCOUNT,
  payload,
});
export const changeMetamaskConnectFunction = (payload) => ({
  type: METAMASK_CONNECT_FUNCTION,
  payload,
});
export const changeNetworkId = (payload) => ({ type: NETWORK_ID, payload });
export const changeLoad = (payload) => ({ type: LOAD, payload });
export const changeShowLoader = (payload) => ({ type: SHOW_LOADER, payload });
export const changeIsLoggedIn = (payload) => ({ type: IS_LOGGED_IN, payload });
export const changeUserInfo = (payload) => ({ type: USER_INFO, payload });
export const changeJwtToken = (payload) => ({ type: JWT_TOKEN, payload });
export const changeShowAlert = (payload) => ({ type: SHOW_ALERT, payload });
export const changeAlertMessage = (payload) => ({
  type: ALERT_MESSAGE,
  payload,
});
export const changeShowFlash = (payload) => ({ type: SHOW_FLASH, payload });
export const changeFlashMessage = (payload) => ({
  type: FLASH_MESSAGE,
  payload,
});
