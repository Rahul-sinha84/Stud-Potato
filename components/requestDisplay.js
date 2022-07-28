import React from "react";

const RequestContainer = ({ requests = [] }) => {
  return (
    <div className="request-container">
      <div className="request-container__container">{requests}</div>
    </div>
  );
};

export default RequestContainer;
