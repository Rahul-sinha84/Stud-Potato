import React from "react";
import Utils from "./Utils";

const SoldProductCard = ({ SoldProducts }) => {
  const {
    imgSrc,
    name,
    consumer,
    dateOfPurchase,
    price,
    priceWithdrawn,
    isInValidity,
  } = SoldProducts;

  if (dateOfPurchase + 10 * 24 * 60 * 60 <= Date.now()) return null;
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
            {consumer}
          </div>
          <div className="sold-products__container--second__item dop">
            Purchased on: {Utils.getStringFromTimeStamp(dateOfPurchase)}
          </div>
        </div>
        <div className="sold-products__container--third">
          <div className="sold-products__container--third__price">₹{price}</div>
          <div className="sold-products__container--third__button">
            {!priceWithdrawn ? (
              <div className="denial-msg">Money already withdrawn</div>
            ) : (
              <button className="button">Withdraw</button>
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

export default SoldProductCard;
