import React from "react";
import { connect } from "react-redux";
import { changeShowAlert, changeAlertMessage } from "../../redux/action";
import { AiFillAlert } from "react-icons/ai";

const Alert = ({ state, changeShowAlert, changeAlertMessage }) => {
  const { showAlert, alertMessage = "" } = state;
  if (!showAlert) return null;

  return (
    <div className="modal-alert">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-alert__content"
      >
        <div className="modal-alert__body">
          <div className="modal-alert__body--heading">
            <AiFillAlert size={80} color="#f05454" />
            <div className="modal-alert__body--heading__text">
              Something went wrong...
            </div>
          </div>
          <div className="modal-alert__body--text">{alertMessage}</div>
          <div className="modal-alert__body--button">
            <button
              className="button"
              onClick={() => {
                changeAlertMessage("");
                changeShowAlert(false);
              }}
            >
              ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });
export default connect(mapStateToProps, {
  changeShowAlert,
  changeAlertMessage,
})(Alert);
