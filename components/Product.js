import React, { useState } from "react";
import Modal from "./modal";
import { AiOutlineCaretDown } from "react-icons/ai";

const Product = ({ product, warranties = [], isEdit = false }) => {
  const {
    imgSrc = "",
    name = "",
    price = "",
    modelNumber = "",
    serialNumber = "",
    seller = "Ramesh",
    dateOfPurchase = Date.now(),
    isSold = true,
    description = "Pariatur aliquip nulla commodo aute consequat commodo pariatur aliquip laborum Lorem ullamco reprehenderit anim. Deserunt adipisicing cupidatat sit eu quis ea. In incididunt in incididunt occaecat nulla fugiat ut occaecat ex consequat. Laborum nisi dolore velit irure ex id qui mollit do et eiusmod minim sit pariatur. Sint ullamco id veniam Lorem sunt velit voluptate eu est pariatur labore elit eiusmod. Nostrud aute eu minim eiusmod reprehenderit do culpa id duis proident consequat officia laboris occaecat. Nulla aliquip eiusmod et anim mollit aliquip fugiat.",
    warranty = {
      validity: "2 years",
      termsAndCondition:
        "Elit et nulla in culpa incididunt dolor irure proident duis ad. Amet consectetur excepteur magna aute fugiat commodo fugiat voluptate esse minim labore consequat duis. Deserunt tempor excepteur cillum fugiat commodo elit. Duis enim exercitation culpa occaecat occaecat reprehenderit labore proident esse enim ipsum. Ut qui ex sit exercitation velit. Et et ullamco eiusmod reprehenderit eiusmod aliquip nisi. Pariatur eiusmod mollit commodo est eu consequat officia veniam sit culpa cupidatat pariatur.",
    },
  } = product;
  const [modalShow, setModalShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownSelected, setDropdownSelected] = useState();
  const [_name, _setName] = useState(name);
  const [_price, _setPrice] = useState(price);
  const [_description, _setDescription] = useState(description);
  const [_modelNumber, _setModelNumber] = useState(modelNumber);
  const [_serialNumber, _setSerialNumber] = useState(serialNumber);
  const [claimModalShow, setClaimModalShow] = useState(false);

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
                    ₹{price}
                  </div>
                  <div className="product-modal__container--product-info__about--seller">
                    <b>Sold by:</b> {seller}
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
                Warranty
              </div>
              <div className="product-modal__container--warranty-info__validity">
                {warranty.validity}
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
                {showDropdown && (
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
            <div className="create-product-modal__container--content__item image-select">
              <label className="file-upload" htmlFor="file">
                Upload image of product
              </label>
              <input type="file" accept="image/*" id="file" />
            </div>
          </div>
          <div className="create-product-modal__container--btn">
            <button className="button">save</button>
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
            <div className="product__container--content__price">₹{price}</div>
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

export default Product;
