import React from "react";
import { useState } from "react";
import { BiListPlus } from "react-icons/bi";
import Modal from "./modal";
import { AiOutlineCaretDown } from "react-icons/ai";

const ArticleDisplay = ({
  articles = [],
  isProduct = true,
  warranty = [],
  isConsumer = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownSelected, setDropdownSelected] = useState();

  console.log(warranty);
  const createModal = () => {
    if (isProduct) {
      return (
        <div className="create-product-modal">
          <div className="create-product-modal__container">
            <div className="create-product-modal__container--content">
              <div className="create-product-modal__container--content__item">
                <label htmlFor="name">Name</label>
                <input placeholder="Enter here" type="text" id="name" />
              </div>
              <div className="create-product-modal__container--content__item">
                <label htmlFor="mno">Model number</label>
                <input placeholder="Enter here" type="text" id="nmo" />
              </div>
              <div className="create-product-modal__container--content__item">
                <label htmlFor="sno">Serial number</label>
                <input placeholder="Enter here" type="text" id="sno" />
              </div>
              <div className="create-product-modal__container--content__item">
                <label htmlFor="price">Price</label>
                <input placeholder="Enter here" type="text" id="price" />
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
                      {warranty.map((option, key) => (
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
    }
    return (
      <div className="warranty-modal">
        <div className="warranty-modal__container">
          <div className="warranty-modal__container--name">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter here" />
          </div>
          <div className="warranty-modal__container--item-type">
            <label htmlFor="item-type">Item Type</label>
            <input type="text" id="item-type" placeholder="Enter here" />
          </div>
          <div className="warranty-modal__container--validity">
            <label htmlFor="validity">Valid upto</label>
            <input type="date" id="validity" />
          </div>
          <div className="warranty-modal__container--terms">
            <label htmlFor="terms">Terms and Conditions</label>
            <textarea
              id="terms"
              cols="30"
              placeholder="Enter here"
              rows="10"
            ></textarea>
          </div>
        </div>
        <div className="warranty-modal__btn modified">
          <button className="button save">Save</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="artice-display">
        <div className="artice-display__container">
          {!isConsumer && (
            <div className="article-display__container--upper">
              <button
                onClick={() => setShowModal(true)}
                className="button article-display__container--upper__btn"
              >
                Create <BiListPlus size={30} />
              </button>
            </div>
          )}
          <div className="article-display__container--lower">{articles}</div>
        </div>
      </div>
      <Modal show={showModal} setShow={setShowModal}>
        {createModal()}
      </Modal>
    </>
  );
};

export default ArticleDisplay;
