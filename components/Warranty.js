import React from "react";
import { useState } from "react";
import Modal from "./modals/modal";
import { connect } from "react-redux";
import {
  changeAlertMessage,
  changeShowAlert,
  changeFlashMessage,
  changeShowFlash,
} from "../redux/action";
import axios from "../services/axios";

const Warranty = ({
  item,
  changeAlertMessage,
  changeShowAlert,
  changeFlashMessage,
  changeShowFlash,
  state,
  loadData,
  setLoadData,
}) => {
  const {
    _id,
    seller,
    name = "",
    isInUse = true,
    validity = "2023-05-29",
    termsAndCondition = "",
    itemType = "",
  } = item;

  const { jwtToken } = state;

  const [showModal, setShowModal] = useState(false);
  const [_name, _setName] = useState(name);
  const [_itemType, _setItemType] = useState(itemType);
  const [_termsAndCondition, _setTermsAndCondition] =
    useState(termsAndCondition);

  const [_validity, _setValidity] = useState(validity);

  const saveWarranty = async () => {
    if (!jwtToken) {
      changeAlertMessage(
        "Having some issues on connection, try loggin out and logging in again !!"
      );
      changeShowAlert(true);
      return;
    }
    if (!_name || !_itemType || !_termsAndCondition) {
      changeAlertMessage("Please specify all the fields !!");
      changeShowAlert(true);
      return;
    }
    if (_validity <= 0) {
      changeAlertMessage("Warranty should be atleast of one year !!");
      changeShowAlert(true);
      return;
    }

    await axios
      .put(
        `/warranty/${_id}`,
        {
          name: _name,
          itemType: _itemType,
          termsAndCondition: _termsAndCondition,
          validity: _validity,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        changeFlashMessage("Warranty updated successfully !!");
        changeShowFlash(true);
        setLoadData(!loadData);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        const resp = err.response.data;
        changeAlertMessage(resp.message);
        changeShowAlert(true);
      });
  };

  const deleteWarranty = async () => {
    if (!jwtToken) {
      changeAlertMessage(
        "Having some issues on connection, try loggin out and logging in again !!"
      );
      changeShowAlert(true);
      return;
    }
    const isHeSure = confirm("Are you sure to delete this warranty ??");
    if (!isHeSure) return;
    await axios
      .delete(`/warranty/${_id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        changeFlashMessage("Warranty Deleted successfully !!");
        changeShowFlash(true);
        setLoadData(!loadData);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        const resp = err.response.data;
        changeAlertMessage(resp.message);
        changeShowAlert(true);
      });
  };

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
          <label htmlFor="validity">Valid upto (in years)</label>
          <input
            value={_validity}
            onChange={(e) => _setValidity(e.target.value)}
            disabled={isInUse}
            type="number"
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
            <button onClick={saveWarranty} className="button save">
              Save
            </button>
            <button onClick={deleteWarranty} className="button delete">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
  return (
    <>
      <div onClick={() => setShowModal(true)} className="warranty">
        <div className="warranty__container">
          <div className="warranty__container--name">{_name}</div>
          <div className="warranty__container--item-type">{_itemType}</div>
          <div className="warranty__container--validity">
            {_validity} Year/s
          </div>
        </div>
      </div>
      <Modal show={showModal} setShow={setShowModal}>
        {modalContent()}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({ state });
export default connect(mapStateToProps, {
  changeAlertMessage,
  changeShowAlert,
  changeFlashMessage,
  changeShowFlash,
})(Warranty);
