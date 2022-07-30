import React, { useState } from "react";
import Modal from "./modals/modal";
import { connect } from "react-redux";
import {
  changeAlertMessage,
  changeShowAlert,
  changeFlashMessage,
  changeShowFlash,
  changeShowLoader,
} from "../redux/action";
import axios from "../services/axios";
import utils from "./Utils";

const Request = ({
  request,
  setDataLoad,
  dataLoad,
  state,
  changeAlertMessage,
  changeShowAlert,
  changeFlashMessage,
  changeShowFlash,
  changeShowLoader,
}) => {
  const { jwtToken, contractInstance, currentAccount, userInfo } = state;

  const { description, product, tag, _id, isPending, isAccept } = request;
  const { imgSrc, tokenId } = product;
  const [showModal, setShowModal] = useState(false);

  const modalForRequest = () => (
    <div className="modal-request">
      <div className="modal-request__container">
        <div className="modal-request__container--text">
          Resolve this request as?
        </div>
        <div className="modal-request__container--btn">
          <button onClick={handleRepair} className="button repair">
            repair
          </button>
          <button onClick={handleReplace} className="button replacement">
            replace
          </button>
        </div>
      </div>
    </div>
  );

  const handleReplace = async () => {
    if (!jwtToken) {
      changeAlertMessage(
        "Having some issues on connection, try logging out and logging in again !!"
      );
      changeShowAlert(true);
      return;
    }
    if (parseInt(currentAccount, "hex") !== parseInt(userInfo.address, "hex")) {
      changeAlertMessage(
        "Please connect to your registered ethereum address !!"
      );
      changeShowAlert(true);
      return;
    }
    const isHeSure = confirm("Are you sure want to replace this ?");
    if (!isHeSure) return;
    try {
      changeShowLoader(true);
      await axios
        .put(
          "/request/action",
          {
            requestId: _id,
            isAccept: true,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then(async (response) => {
          const newProduct = response.data.data;
          console.log(newProduct, !newProduct._id);
          if (!newProduct._id) {
            changeAlertMessage("No Product is available for replacement !!");
            changeShowAlert(true);
            return;
          }
          console.log(product, product.tokenId);
          const tx = await contractInstance.replaceProduct(
            product.tokenId,
            newProduct.imgSrc,
            { from: currentAccount }
          );
          await tx.wait();
          const tokenId = await contractInstance.getLatestTokenId();

          await axios
            .post(`/product/buy/${newProduct._id}`, {
              tokenId: parseInt(tokenId._hex),
              transactionAddress: tx.hash,
              isReplace: true,
            })
            .then((res) => {
              changeFlashMessage("Successfully Replaced this request  !!");
              changeShowFlash(true);
              setDataLoad(!dataLoad);
            })
            .catch((err) => {
              console.log(err);
              const resp = err.response.data;
              changeAlertMessage(resp.message);
              changeShowLoader(false);
              changeShowAlert(true);
              changeShowLoader(false);
            });
        });

      changeShowLoader(false);
    } catch (err) {
      changeShowLoader(false);
      return utils.handleBCError(err);
    }
  };

  const handleRepair = async () => {
    if (!jwtToken) {
      changeAlertMessage(
        "Having some issues on connection, try logging out and logging in again !!"
      );
      changeShowAlert(true);
      return;
    }
    try {
      changeShowLoader(true);
      await axios
        .put(
          "/request/action/repair",
          { requestId: _id },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((res) => {
          changeFlashMessage("Successfully resolved this request as repair !!");
          changeShowFlash(true);
          setDataLoad(!dataLoad);
        })
        .catch((err) => {
          console.log(err);
          const resp = err.response.data;
          changeAlertMessage(resp.message);
          changeShowLoader(false);
          changeShowAlert(true);
          changeShowLoader(false);
        });
      changeShowLoader(false);
    } catch (err) {
      console.log(err);
      const resp = err.response.data;
      changeAlertMessage(resp.message);
      changeShowLoader(false);
      changeShowAlert(true);
      changeShowLoader(false);
    }
  };

  const handleAccept = async () => {
    if (!jwtToken) {
      changeAlertMessage(
        "Having some issues on connection, try logging out and logging in again !!"
      );
      changeShowAlert(true);
      return;
    }
    if (parseInt(currentAccount, "hex") !== parseInt(userInfo.address, "hex")) {
      changeAlertMessage(
        "Please connect to your registered ethereum address !!"
      );
      changeShowAlert(true);
      return;
    }
    const isHeSure = confirm("Are you sure to accept this request !!");
    if (!isHeSure) return;

    try {
      if (tag === "return") {
        await axios
          .put(
            "/request/action",
            {
              isAccept: true,
              requestId: _id,
            },
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          )
          .then((res) => {})
          .catch((err) => {
            console.log(err);
            const resp = err.response.data;
            changeAlertMessage(resp.message);
            changeShowLoader(false);
            changeShowAlert(true);
            changeShowLoader(false);
          });

        const tx = await contractInstance.returnProduct(tokenId, {
          from: currentAccount,
        });
        await tx.wait();
        changeFlashMessage("Successfully returned the product !!");
        changeShowFlash(true);
        changeShowLoader(false);
      } else {
        setShowModal(true);
      }
    } catch (err) {
      changeShowLoader(false);
      return utils.handleBCError(err);
    }
  };

  return (
    <>
      <div className="request">
        <div className="request__container">
          <div className="request__container--img">
            <img src={imgSrc} alt="product image" />
          </div>
          <div className="request__container--text">
            <div className="request__container--text__content">
              {description}
            </div>
          </div>
          <div className="request__container--tag">
            {tag === "return" ? (
              <div className="request__container--tag__return">return</div>
            ) : (
              <div className="request__container--tag__warranty">warranty</div>
            )}
          </div>
          <div className="request__container--btns">
            {isPending ? (
              <>
                <button
                  onClick={handleAccept}
                  className="button request-button-one"
                >
                  accept
                </button>
                <button className="button request-button-two">reject</button>
              </>
            ) : (
              <div className="request__container--btns__msg">
                Already {isAccept ? "accepted" : "rejected"} this request
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal show={showModal} setShow={setShowModal}>
        {modalForRequest()}
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
})(Request);
