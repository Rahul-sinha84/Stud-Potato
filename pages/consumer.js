import React, { useState, useEffect } from "react";
import ArticleDisplay from "../components/articleDisplay";
import Product from "../components/Product";
import { connect } from "react-redux";
import {
  changeAlertMessage,
  changeShowAlert,
  changeShowLoader,
} from "../redux/action";
import axios from "../services/axios";

const Consumer = ({
  state,
  changeAlertMessage,
  changeShowAlert,
  changeShowLoader,
}) => {
  const { jwtToken } = state;

  const [reloadData, setReloadData] = useState(false);
  const [productData, setProductData] = useState([]);
  const [choice, setChoice] = useState("products");
  const [products, setProducts] = useState([]);

  const renderContainer = () => {
    if (choice === "products")
      return (
        <ArticleDisplay
          isConsumer={true}
          isProduct={true}
          articles={products}
          setLoadData={setReloadData}
          loadData={reloadData}
        />
      );
  };

  const getData = async () => {
    if (!jwtToken) return;

    const productResponse = await axios.get("/product/get/user", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    setProductData(productResponse.data.data);
  };

  useEffect(() => {
    (async () => {
      changeShowLoader(true);
      await getData();
      setProducts(getProductCards());
      changeShowLoader(false);
    })();
  }, [jwtToken, productData.length, reloadData]);

  const getProductCards = () => {
    return productData.map((val, ind) => (
      <div key={ind}>
        <Product
          loadData={reloadData}
          setLoadData={setReloadData}
          product={val}
        />
      </div>
    ));
  };

  return (
    <div className="manage">
      <div className="manage__container">
        <div className="manage__container--menu">
          <div
            onClick={() => setChoice("products")}
            className={`${
              choice === "products" ? "active" : ""
            } manage__container--menu__item`}
          >
            <div>Products</div>
          </div>
          <div
            onClick={() => setChoice("requests")}
            className={`${
              choice === "requests" ? "active" : ""
            } manage__container--menu__item`}
          >
            <div className="menu-last">Requests History</div>
          </div>
        </div>
        <div className="manage__container--content">{renderContainer()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });
export default connect(mapStateToProps, {
  changeAlertMessage,
  changeShowAlert,
  changeShowLoader,
})(Consumer);
