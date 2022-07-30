import React, { useEffect } from "react";

const RequestContainer = ({ requests = [], setLoadData, loadData }) => {
  useEffect(() => {
    setLoadData(!loadData);
  }, []);
  return (
    <div className="request-container">
      <div className="request-container__container">{requests}</div>
    </div>
  );
};

export default RequestContainer;
