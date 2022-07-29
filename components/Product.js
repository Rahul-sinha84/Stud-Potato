import React, { useState } from "react";
import Modal from "./modals/modal";
import { AiOutlineCaretDown } from "react-icons/ai";
import { connect } from "react-redux";
import {
  changeAlertMessage,
  changeShowAlert,
  changeFlashMessage,
  changeShowFlash,
  changeShowLoader,
} from "../redux/action";
import axios from "../services/axios";

const Product = ({
  product,
  warranties = [],
  isEdit = false,
  state,
  changeAlertMessage,
  changeShowAlert,
  changeFlashMessage,
  changeShowFlash,
  changeShowLoader,
  setLoadData,
  loadData,
}) => {
  const { jwtToken } = state;

  const {
    _id,
    imgSrc = "",
    name = "",
    price = "",
    modelNumber = "",
    serialNumber = "",
    seller,
    dateOfPurchase,
    isSold,
    description,
    warranty = {
      validity: "2years",
      termsAndCondition:
        "Enim labore elit labore commodo esse. Aliqua exercitation in aute labore nostrud voluptate adipisicing tempor amet commodo culpa voluptate. Ut cupidatat sunt minim aliquip in irure dolor qui esse.",
    },
  } = product;

  const [modalShow, setModalShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownSelected, setDropdownSelected] = useState(warranty);
  const [_name, _setName] = useState(name);
  const [_price, _setPrice] = useState(price);
  const [_description, _setDescription] = useState(description);
  const [_modelNumber, _setModelNumber] = useState(modelNumber);
  const [_serialNumber, _setSerialNumber] = useState(serialNumber);
  const [claimModalShow, setClaimModalShow] = useState(false);

  const handleSaveProduct = async () => {
    if (!jwtToken) {
      changeAlertMessage(
        "Having some issues on connection, try logging out and logging in again !!"
      );
      changeShowAlert(true);
      return;
    }
    if (
      !_name ||
      !_price ||
      !_description ||
      !_modelNumber ||
      !_serialNumber ||
      !dropdownSelected
    ) {
      changeAlertMessage("Please specify all the fields !!");
      changeShowAlert(true);
      return;
    }
    changeShowLoader(true);
    const { files } = document.querySelector(".product-image__upload-save");
    let uploadImgURL = "";
    if (files.length) {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

      const options = {
        method: "POST",
        body: formData,
      };
      const response = await await fetch(
        `https://api.Cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        options
      );
      uploadImgURL = (await response.json()).secure_url;
    }
    await axios
      .put(
        `/product/${_id}`,
        {
          name: _name,
          imgSrc: uploadImgURL,
          serialNumber: _serialNumber,
          modelNumber: _modelNumber,
          description: _description,
          warranty: dropdownSelected._id,
          price: _price,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        changeFlashMessage("Product updated successfully !!");
        changeShowFlash(true);

        setModalShow(false);
        setLoadData(!loadData);
      })
      .catch((err) => {
        console.log(err);
        const resp = err.response.data;
        changeAlertMessage(resp.message);
        changeShowLoader(false);
        changeShowAlert(true);
      });
    changeShowLoader(false);
  };

  const handleDeleteProduct = async () => {
    if (!jwtToken) {
      changeAlertMessage(
        "Having some issues on connection, try logging out and logging in again !!"
      );
      changeShowAlert(true);
      return;
    }
    const isHeSure = confirm("Are you sure to delete this product ??");
    if (!isHeSure) return;
    changeShowLoader(true);
    await axios
      .delete(`/product/${_id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        setLoadData(!loadData);
        setModalShow(false);
        changeFlashMessage("Successfully deleted the product !!");
        changeShowFlash(true);
      })
      .catch((err) => {
        console.log(err);
        const resp = err.response.data;
        changeAlertMessage(resp.message);
        changeShowLoader(false);
        changeShowAlert(true);
      });
    changeShowLoader(false);
  };

  const modalContent = () => {
    if (!isEdit)
      return (
        <div className="product-modal">
          <div className="product-modal__container">
            <div className="product-modal__container--product-info">
              <div className="product-modal-one">
                <div className="product-modal__container--product-info__img">
                  <img src={imgSrc} alt="product image" />
                </div>
              </div>
              <div className="product-modal-two">
                <div className="product-modal__container--product-info__about">
                  <div className="product-modal__container--product-info__about--name">
                    {name}
                  </div>
                  <div className="product-modal__container--product-info__about--price">
                    {price} ETH
                  </div>
                  <div className="product-modal__container--product-info__about--seller">
                    <b>Sold by:</b> {seller.username}
                  </div>
                  <div className="product-modal__container--product-info__about--seller">
                    <b>Model number:</b> {modelNumber}
                  </div>
                  <div className="product-modal__container--product-info__about--seller">
                    <b>Serial number:</b> {serialNumber}
                  </div>
                  <div className="product-modal__container--product-info__about--desc">
                    <div className="product-modal__container--product-info__about--desc__title">
                      About Product
                    </div>
                    <div className="product-modal__container--product-info__about--desc__content">
                      {description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-modal__container--warranty-info">
              <div className="product-modal__container--warranty-info__title">
                {warranty.name}
              </div>
              <div className="product-modal__container--warranty-info__validity">
                {warranty.validity} year(/s)
              </div>
              <div className="product-modal__container--warranty-info__terms">
                {warranty.termsAndCondition}
              </div>
            </div>
            <div className="product-modal__container--btn">
              {isSold ? (
                dateOfPurchase + 10 * 24 * 60 * 60 >= Date.now() ? (
                  <button
                    onClick={() => setClaimModalShow(true)}
                    className="button return"
                  >
                    return
                  </button>
                ) : (
                  <button
                    onClick={() => setClaimModalShow(true)}
                    className="button replace"
                  >
                    replace
                  </button>
                )
              ) : (
                <button className="button">buy now</button>
              )}
            </div>
          </div>
        </div>
      );

    return (
      <div className="create-product-modal">
        <div className="create-product-modal__container">
          <div className="create-product-modal__container--content">
            <div className="create-product-modal__container--content__item">
              <label htmlFor="name">Name</label>
              <input
                value={_name}
                onChange={(e) => _setName(e.target.value)}
                placeholder="Enter here"
                type="text"
                id="name"
                disabled={isSold}
              />
            </div>
            <div className="create-product-modal__container--content__item">
              <label htmlFor="mno">Model number</label>
              <input
                value={_modelNumber}
                onChange={(e) => _setModelNumber(e.target.value)}
                placeholder="Enter here"
                type="text"
                id="nmo"
                disabled={isSold}
              />
            </div>
            <div className="create-product-modal__container--content__item">
              <label htmlFor="sno">Serial number</label>
              <input
                value={_serialNumber}
                onChange={(e) => _setSerialNumber(e.target.value)}
                placeholder="Enter here"
                type="text"
                id="sno"
                disabled={isSold}
              />
            </div>
            <div className="create-product-modal__container--content__item">
              <label htmlFor="price">Price</label>
              <input
                value={_price}
                onChange={(e) => _setPrice(e.target.value)}
                placeholder="Enter here"
                type="text"
                id="price"
                disabled={isSold}
              />
            </div>
            <div className="create-product-modal__container--content__item warranty-select">
              <label htmlFor="warranty">Select Warranty Plan</label>
              <div className="dropdown-small">
                <div
                  className="dropdown-small__btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {dropdownSelected ? dropdownSelected.name : "Choose one"}
                  <AiOutlineCaretDown />
                </div>
                {showDropdown && !isSold && (
                  <div className="dropdown-small__content">
                    {warranties.map((option, key) => (
                      <div
                        key={key}
                        onClick={() => {
                          setDropdownSelected(option);
                          setShowDropdown(false);
                        }}
                        className="dropdown-small__content--item"
                      >
                        {option.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="create-product-modal__container--content__item">
              <label htmlFor="description">About Product</label>
              <textarea
                value={_description}
                onChange={(e) => _setDescription(e.target.value)}
                placeholder="Enter here"
                type="text"
                rows={10}
                disabled={isSold}
                id="description"
              />
            </div>
            <div className="create-product-modal__container--content__item image-select">
              <label className="file-upload" htmlFor="file">
                Upload image of product
              </label>
              <input
                className="product-image__upload-save"
                type="file"
                accept="image/*"
                id="file"
              />
            </div>
          </div>
          <div className="create-product-modal__container--btn">
            {isSold ? (
              <div className="sold-msg">*this product is sold </div>
            ) : (
              <>
                <button onClick={handleSaveProduct} className="button save">
                  save
                </button>
                <button onClick={handleDeleteProduct} className="button delete">
                  delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  const claimModalContent = () => (
    <div className="claim-modal">
      <div className="claim-modal__container">
        <div className="claim-modal__container--header">
          Please fill the reason for claiming the request
        </div>
        <div className="claim-modal__container--content">
          <textarea rows="5" placeholder="Enter reason here" required />
          <button className="button">Submit</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="product">
        <div className="product__container">
          <div className="product__container--img">
            <img src={imgSrc} alt="product image" />
            <div
              onClick={() => setModalShow(true)}
              className="product__container--img__view-btn"
            >
              View
            </div>
          </div>
          <div className="product__container--content">
            <div className="product__container--content__name">{name}</div>
            <div className="product__container--content__price">
              {price} ETH
            </div>
          </div>
        </div>
      </div>
      <Modal show={modalShow} setShow={setModalShow}>
        {modalContent()}
      </Modal>
      <Modal show={claimModalShow} setShow={setClaimModalShow}>
        {claimModalContent()}
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
  changeShowLoader,
})(Product);
