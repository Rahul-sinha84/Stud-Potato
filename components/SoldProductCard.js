import React from "react";
import Utils from "./Utils";
import { connect } from "react-redux";
import {
  changeShowAlert,
  changeAlertMessage,
  changeFlashMessage,
  changeShowFlash,
  changeShowLoader,
} from "../redux/action";
import utils from "./Utils";
import { USER_INFO } from "../redux/types";

const SoldProductCard = ({
  SoldProducts,
  loadData,
  setLoadData,
  changeShowAlert,
  changeAlertMessage,
  changeFlashMessage,
  changeShowFlash,
  changeShowLoader,
  state,
}) => {
  const {
    imgSrc,
    name,
    consumer,
    dateOfPurchase,
    price,
    priceWithdrawn,
    isInValidity,
    tokenId,
  } = SoldProducts;

  const { currentAccount, contractInstance, userInfo } = state;

  if (
    new Date(dateOfPurchase).setDate(new Date(dateOfPurchase).getDate() + 10) >=
    Date.now()
  )
    return null;

  const handleWithdraw = async () => {
    if (!contractInstance.address) {
      changeAlertMessage(
        "Contract is not connected yet, try reloading the page !!"
      );
      changeShowAlert(true);
      return;
    }
    try {
      changeShowLoader(true);

      console.log(tokenId);
      await contractInstance.sendMoneyToSeller(parseInt(tokenId), {
        from: currentAccount,
      });
      await tx.wait();
      changeFlashMessage("Successfully transfered !!");
      changeShowFlash("");
      changeShowLoader(false);
    } catch (err) {
      changeShowLoader(false);
      return utils.handleBCError(err);
    }
  };

  return (
    <div className="sold-products">
      <div className="sold-products__container">
        <div className="sold-products__container--first">
          <div className="sold-products__container--first__img">
            <img src={imgSrc} alt="product image" />
          </div>
        </div>
        <div className="sold-products__container--second">
          <div className="sold-products__container--second__item name">
            {name}
          </div>
          <div className="sold-products__container--second__item consumer">
            {consumer.username}
          </div>
          <div className="sold-products__container--second__item dop">
            Purchased on: {Utils.getStringFromTimeStamp(dateOfPurchase)}
          </div>
        </div>
        <div className="sold-products__container--third">
          <div className="sold-products__container--third__price">₹{price}</div>
          <div className="sold-products__container--third__button">
            {priceWithdrawn ? (
              <div className="denial-msg">Money already withdrawn</div>
            ) : (
              <button onClick={handleWithdraw} className="button">
                Withdraw
              </button>
            )}
          </div>
        </div>
        <div className="sold-products__container--fourth">
          {isInValidity ? (
            <div className="sold-products__container--fourth__denial-msg">
              Product is in validity period
            </div>
          ) : (
            <button className="button sold-products__container--fourth__btn">
              burn token
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });
export default connect(mapStateToProps, {
  changeShowAlert,
  changeAlertMessage,
  changeFlashMessage,
  changeShowFlash,
  changeShowLoader,
})(SoldProductCard);
