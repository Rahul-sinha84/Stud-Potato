import React from "react";

const Loader = ({ show = false, children }) => {
  if (!show) return;
  return (
    <div className="modal-loader">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-loader-content"
      >
        {children}
      </div>
    </div>
  );
};

export default Loader;
