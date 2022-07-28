import React from "react";

const DropDown = ({ toShow = false, children }) => {
  return (
    <div className="dropdown" style={{ display: toShow ? "block" : "none" }}>
      <div className="dropdown__container">{children}</div>
    </div>
  );
};

export default DropDown;
