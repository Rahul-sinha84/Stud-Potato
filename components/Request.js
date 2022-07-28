import React, { useState } from "react";
import Modal from "./modal";

const Request = ({ request }) => {
  const { description, product, tag = "warranty" } = request;
  const { imgSrc } = product;
  const [showModal, setShowModal] = useState(false);

  const modalForRequest = () => (
    <div className="modal-request">
      <div className="modal-request__container">
        <div className="modal-request__container--text">
          Resolve this request as?
        </div>
        <div className="modal-request__container--btn">
          <button className="button repair">repair</button>
          <button className="button replacement">replace</button>
        </div>
      </div>
    </div>
  );

  const handleAccept = async () => {
    if (tag === "return") return;
    setShowModal(true);
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
            <button
              onClick={handleAccept}
              className="button request-button-one"
            >
              accept
            </button>
            <button className="button request-button-two">reject</button>
          </div>
        </div>
      </div>
      <Modal show={showModal} setShow={setShowModal}>
        {modalForRequest()}
      </Modal>
    </>
  );
};

export default Request;
