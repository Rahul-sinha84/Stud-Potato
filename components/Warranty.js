import React from "react";
import { useState } from "react";
import Modal from "./modal";
import Utils from "../components/Utils";

const Warranty = ({ item }) => {
  const {
    seller,
    name = "",
    isInUse = false,
    validity = "2023-05-29",
    termsAndCondition = "",
    itemType = "",
  } = item;
  const [showModal, setShowModal] = useState(false);
  const [_name, _setName] = useState(name);
  const [_itemType, _setItemType] = useState(itemType);
  const [_termsAndCondition, _setTermsAndCondition] =
    useState(termsAndCondition);

  const [_validity, _setValidity] = useState(validity);
  console.log(_validity);

  const modalContent = () => (
    <div className="warranty-modal">
      <div className="warranty-modal__container">
        <div className="warranty-modal__container--name">
          <label htmlFor="name">Name</label>
          <input
            disabled={isInUse}
            value={_name}
            onChange={(e) => _setName(e.target.value)}
            type="text"
            id="name"
            placeholder="Enter here"
          />
        </div>
        <div className="warranty-modal__container--item-type">
          <label htmlFor="item-type">Item Type</label>
          <input
            disabled={isInUse}
            value={_itemType}
            onChange={(e) => _setItemType(e.target.value)}
            type="text"
            id="item-type"
            placeholder="Enter here"
          />
        </div>
        <div className="warranty-modal__container--validity">
          <label htmlFor="validity">Valid upto</label>
          <input
            value={Utils.getStringFromTimeStamp(_validity)}
            onChange={(e) =>
              _setValidity(Utils.getTimeStampFromString(e.target.value))
            }
            disabled={isInUse}
            type="date"
            id="validity"
          />
        </div>
        <div className="warranty-modal__container--terms">
          <label htmlFor="terms">Terms and Conditions</label>
          <textarea
            disabled={isInUse}
            id="terms"
            cols="30"
            placeholder="Enter here"
            rows="10"
            value={_termsAndCondition}
            onChange={(e) => _setTermsAndCondition(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="warranty-modal__btn">
        {isInUse ? (
          <div className="warranty-modal__btn--warn">
            *this warranty modal is already in use
          </div>
        ) : (
          <>
            <button className="button save">Save</button>
            <button className="button delete">Delete</button>
          </>
        )}
      </div>
    </div>
  );
  return (
    <>
      <div onClick={() => setShowModal(true)} className="warranty">
        <div className="warranty__container">
          <div className="warranty__container--name">{name}</div>
          <div className="warranty__container--item-type">{itemType}</div>
          <div className="warranty__container--validity">
            {Utils.getStringFromTimeStamp(validity)}
          </div>
        </div>
      </div>
      <Modal show={showModal} setShow={setShowModal}>
        {modalContent()}
      </Modal>
    </>
  );
};

export default Warranty;
