import React from "react";

const Modal = ({ show = false, setShow, children }) => {
  if (!show) return null;
  return (
    <div className="modal" onClick={() => setShow(false)}>
      <div onClick={(e) => e.stopPropagation()} className="modal-content">
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
