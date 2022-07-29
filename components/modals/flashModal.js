import React from "react";
import { connect } from "react-redux";
import { changeFlashMessage, changeShowFlash } from "../../redux/action";

const FlashModal = ({ state, changeShowFlash, changeFlashMessage }) => {
  const { showFlash, flashMessage } = state;
  if (!showFlash) return null;

  return (
    <div
      onClick={() => {
        changeShowFlash(false);
        changeFlashMessage("");
      }}
      className="modal-flash"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-flash__content"
      >
        <div className="modal-flash__body">{flashMessage}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });
export default connect(mapStateToProps, {
  changeShowFlash,
  changeFlashMessage,
})(FlashModal);
