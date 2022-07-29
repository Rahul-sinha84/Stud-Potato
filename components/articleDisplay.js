import React from "react";
import { useState, useEffect } from "react";
import { BiListPlus } from "react-icons/bi";
import Modal from "./modals/modal";
import { AiOutlineCaretDown } from "react-icons/ai";
import utils from "./Utils";
import { connect } from "react-redux";
import {
  changeShowAlert,
  changeAlertMessage,
  changeShowFlash,
  changeFlashMessage,
  changeShowLoader,
} from "../redux/action";
import axios from "../services/axios";

const ArticleDisplay = ({
  articles = [],
  isProduct = true,
  warranty = [],
  isConsumer = false,
  changeAlertMessage,
  changeShowAlert,
  changeShowFlash,
  changeFlashMessage,
  changeShowLoader,
  state,
  setLoadData,
  loadData,
}) => {
  const { jwtToken } = state;

  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownSelected, setDropdownSelected] = useState();

  const [wName, wSetName] = useState("");
  const [wItemType, wSetItemType] = useState("");
  const [wValidity, wSetValidity] = useState(1);
  const [wTermsAndCondition, wSetTermsAndCondition] = useState("");

  const [pName, pSetName] = useState("");
  const [pModelNumber, pSetModelNumber] = useState("");
  const [pSerialNumber, pSetSerialNumber] = useState("");
  const [pPrice, pSetPrice] = useState("");
  const [pDescription, pSetDescription] = useState("");

  useEffect(() => {
    setLoadData(!loadData);
  }, []);

  const handleCreateProduct = async () => {
    if (!jwtToken) {
      changeAlertMessage(
        "Having some issues on connection, try loggin out and logging in again !!"
      );
      changeShowAlert(true);
      return;
    }
    if (
      !pName ||
      !pModelNumber ||
      !pSerialNumber ||
      !pPrice ||
      !dropdownSelected ||
      !pDescription
    ) {
      changeAlertMessage("Please specify all the fields !!");
      changeShowAlert(true);
      return;
    }
    changeShowLoader(true);
    const { files } = document.querySelector(".product-image__upload");
    if (!files.length) {
      changeAlertMessage("Please upload an image of the product !!");
      changeShowAlert(true);
      changeShowLoader(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);

    const options = {
      method: "POST",
      body: formData,
    };
    await fetch(
      `https://api.Cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      options
    )
      .then(async (res) => {
        const uploadImgURL = (await res.json()).secure_url;
        await axios
          .post(
            "/product/create",
            {
              name: pName,
              imgSrc: uploadImgURL,
              serialNumber: pSerialNumber,
              modelNumber: pModelNumber,
              description: pDescription,
              warranty: dropdownSelected._id,
              price: pPrice,
            },
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((response) => {
            changeFlashMessage("Product created successfully !!");
            changeShowFlash(true);
            pSetName("");
            pSetPrice("");
            pSetDescription("");
            pSetSerialNumber("");
            pSetModelNumber("");
            setDropdownSelected(undefined);
            setShowModal(false);
            setLoadData(!loadData);
          })
          .catch((err) => {
            const resp = err.response.data;
            console.log(resp);
            changeAlertMessage(resp.message);
            changeShowAlert(true);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    changeShowLoader(false);
  };

  const handleCreateWarranty = async () => {
    if (!jwtToken) {
      changeAlertMessage(
        "Having some issues on connection, try loggin out and logging in again !!"
      );
      changeShowAlert(true);
      return;
    }
    if (!wName || !wItemType || !wTermsAndCondition) {
      changeAlertMessage("Please specify all the fields !!");
      changeShowAlert(true);
      return;
    }
    if (wValidity <= 0) {
      changeAlertMessage("Warranty should be atleast of one year !!");
      changeShowAlert(true);
      return;
    }
    changeShowLoader(true);
    await axios
      .post(
        "/warranty/create",
        {
          name: wName,
          validity: wValidity,
          termsAndCondition: wTermsAndCondition,
          itemType: wItemType,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        changeFlashMessage("Warranty created successfully !!");
        changeShowFlash(true);
        wSetName("");
        wSetItemType("");
        wSetTermsAndCondition("");
        wSetValidity(utils.getStringFromTimeStamp(Date.now()));
        setShowModal(false);
        setLoadData(!loadData);
      })
      .catch((err) => {
        const resp = err.response.data;
        console.log(resp);
        changeAlertMessage(resp.message);
        changeShowAlert(true);
      });
    changeShowLoader(false);
  };

  const createModal = () => {
    if (isProduct) {
      return (
        <div className="create-product-modal">
          <div className="create-product-modal__container">
            <div className="create-product-modal__container--content">
              <div className="create-product-modal__container--content__item">
                <label htmlFor="name">Name</label>
                <input
                  value={pName}
                  onChange={(e) => pSetName(e.target.value)}
                  placeholder="Enter here"
                  type="text"
                  id="name"
                />
              </div>
              <div className="create-product-modal__container--content__item">
                <label htmlFor="mno">Model number</label>
                <input
                  value={pModelNumber}
                  onChange={(e) => pSetModelNumber(e.target.value)}
                  placeholder="Enter here"
                  type="text"
                  id="nmo"
                />
              </div>
              <div className="create-product-modal__container--content__item">
                <label htmlFor="sno">Serial number</label>
                <input
                  value={pSerialNumber}
                  onChange={(e) => pSetSerialNumber(e.target.value)}
                  placeholder="Enter here"
                  type="text"
                  id="sno"
                />
              </div>
              <div className="create-product-modal__container--content__item">
                <label htmlFor="price">Price</label>
                <input
                  value={pPrice}
                  onChange={(e) => pSetPrice(e.target.value)}
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
              <div className="create-product-modal__container--content__item">
                <label htmlFor="description">About Product</label>
                <textarea
                  value={pDescription}
                  onChange={(e) => pSetDescription(e.target.value)}
                  placeholder="Enter here"
                  type="text"
                  rows={10}
                  id="description"
                />
              </div>
              <div className="create-product-modal__container--content__item image-select">
                <label className="file-upload" htmlFor="file">
                  Upload image of product
                </label>
                <input
                  className="product-image__upload"
                  type="file"
                  accept="image/*"
                  id="file"
                />
              </div>
            </div>
            <div className="create-product-modal__container--btn">
              <button onClick={handleCreateProduct} className="button">
                save
              </button>
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
            <input
              value={wName}
              onChange={(e) => wSetName(e.target.value)}
              type="text"
              id="name"
              placeholder="Enter here"
            />
          </div>
          <div className="warranty-modal__container--item-type">
            <label htmlFor="item-type">Item Type</label>
            <input
              value={wItemType}
              onChange={(e) => wSetItemType(e.target.value)}
              type="text"
              id="item-type"
              placeholder="Enter here"
            />
          </div>
          <div className="warranty-modal__container--validity">
            <label htmlFor="validity">Valid upto (in years)</label>
            <input
              value={wValidity}
              onChange={(e) => wSetValidity(e.target.value)}
              type="number"
              id="validity"
            />
          </div>
          <div className="warranty-modal__container--terms">
            <label htmlFor="terms">Terms and Conditions</label>
            <textarea
              id="terms"
              cols="30"
              placeholder="Enter here"
              rows="10"
              value={wTermsAndCondition}
              onChange={(e) => wSetTermsAndCondition(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="warranty-modal__btn modified">
          <button onClick={handleCreateWarranty} className="button save">
            Save
          </button>
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
          <div className="article-display__container--lower">
            {!articles.length ? (
              <div className="article-display__container--lower__empty-msg">
                No {isProduct ? "Products" : "Warranties"} are created yet !!
              </div>
            ) : (
              articles
            )}
          </div>
        </div>
      </div>
      <Modal show={showModal} setShow={setShowModal}>
        {createModal()}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({ state });
export default connect(mapStateToProps, {
  changeAlertMessage,
  changeShowAlert,
  changeShowFlash,
  changeFlashMessage,
  changeShowLoader,
})(ArticleDisplay);
