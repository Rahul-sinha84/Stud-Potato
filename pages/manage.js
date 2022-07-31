import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ArticleDisplay from "../components/articleDisplay";
import Product from "../components/Product";
import Request from "../components/Request";
import RequestContainer from "../components/requestDisplay";
import SoldProductCard from "../components/SoldProductCard";
import Warranty from "../components/Warranty";
import axios from "../services/axios";
import { changeShowLoader } from "../redux/action";

const dummySoldProducts = [
  {
    imgSrc:
      "https://images.unsplash.com/photo-1563389234808-52344934935c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    name: "Formal Shirt",
    consumer: "Ram Lal",
    dateOfPurchase: "1721769685626",
    price: 2000,
    isInValidity: true,
    priceWithdrawn: true,
    modelNumber: 12,
    serialNumber: 201,
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1563389234808-52344934935c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    name: "Formal Shirt",
    consumer: "Ram Lal",
    dateOfPurchase: "1721769685626",
    price: 2000,
    isInValidity: true,
    priceWithdrawn: true,
    modelNumber: 12,
    serialNumber: 201,
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1563389234808-52344934935c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    name: "Formal Shirt",
    consumer: "Ram Lal",
    dateOfPurchase: "1721769685626",
    price: 2000,
    isInValidity: true,
    priceWithdrawn: true,
    modelNumber: 12,
    serialNumber: 201,
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1563389234808-52344934935c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    name: "Formal Shirt",
    consumer: "Ram Lal",
    dateOfPurchase: "1721769685626",
    price: 2000,
    isInValidity: true,
    priceWithdrawn: true,
    modelNumber: 12,
    serialNumber: 201,
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1563389234808-52344934935c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    name: "Formal Shirt",
    consumer: "Ram Lal",
    dateOfPurchase: "1721769685626",
    price: 2000,
    isInValidity: true,
    priceWithdrawn: true,
    modelNumber: 12,
    serialNumber: 201,
  },
];
const Manage = ({ state, changeShowLoader }) => {
  const [warrantyData, setWarrantyData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [unsoldData, setUnsoldData] = useState([]);

  const [warrantyCards, setWarrantyCards] = useState([]);
  const [productCards, setProductCards] = useState([]);
  const [requestCards, setRequestCards] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [choice, setChoice] = useState("warranty");
  const [reloadData, setReloadData] = useState(false);

  const { jwtToken } = state;

  const renderContent = () => {
    switch (choice) {
      case "warranty": {
        return (
          <ArticleDisplay
            loadData={reloadData}
            setLoadData={setReloadData}
            isProduct={false}
            articles={warrantyCards}
          />
        );
      }
      case "product": {
        return (
          <ArticleDisplay
            loadData={reloadData}
            setLoadData={setReloadData}
            warranty={warrantyData}
            isProduct={true}
            articles={productCards}
          />
        );
      }
      case "claim": {
        return (
          <RequestContainer
            loadData={reloadData}
            setLoadData={setReloadData}
            requests={requestCards}
          />
        );
      }
      case "soldProducts": {
        return (
          <RequestContainer
            loadData={reloadData}
            setLoadData={setReloadData}
            requests={soldProducts}
          />
        );
      }
      default: {
        return null;
      }
    }
  };
  const getProductCards = () => {
    return productData.map((val, ind) => (
      <div key={val._id}>
        <Product
          setLoadData={setReloadData}
          loadData={reloadData}
          warranties={warrantyData}
          isEdit={true}
          product={val}
        />
      </div>
    ));
  };
  const getWarrantyCards = () => {
    return warrantyData.map((val, ind) => (
      <div key={val._id}>
        <Warranty
          loadData={reloadData}
          setLoadData={setReloadData}
          item={val}
        />
      </div>
    ));
  };
  const getRequestCards = () => {
    return requestData.map((val, ind) => (
      <div key={val._id}>
        <Request
          dataLoad={reloadData}
          setDataLoad={setReloadData}
          request={val}
        />
      </div>
    ));
  };
  const getSoldProductCards = () => {
    return unsoldData.map((val, ind) => (
      <div key={val._id}>
        <SoldProductCard
          loadData={reloadData}
          setLoadData={setReloadData}
          SoldProducts={val}
        />
      </div>
    ));
  };

  const getData = async () => {
    if (!jwtToken) return;
    //getting all the warranties
    const warrantyResponse = await axios.get("/warranty", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    setWarrantyData(warrantyResponse.data.data);

    //getting all the products
    const productResponse = await axios.get("/product/get/user", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    setProductData(productResponse.data.data);

    //getting all the request for the seller
    const requestResponse = await axios.get("/request", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    setRequestData(requestResponse.data.data);

    //getting all the unsold product
    const unSoldResponse = await axios.get("/product/get/user/sold", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    setUnsoldData(unSoldResponse.data.data);
  };

  useEffect(() => {
    (async () => {
      changeShowLoader(true);
      await getData();
      setWarrantyCards(getWarrantyCards());
      setProductCards(getProductCards());
      setRequestCards(getRequestCards());
      setSoldProducts(getSoldProductCards());
      changeShowLoader(false);
    })();
  }, [jwtToken, reloadData, warrantyData.length, productData.length]);

  useEffect(() => {}, []);
  return (
    <div className="manage">
      <div className="manage__container">
        <div className="manage__container--menu">
          <div
            onClick={() => setChoice("warranty")}
            className={`${
              choice === "warranty" ? "active" : ""
            } manage__container--menu__item`}
          >
            <div>Warranty</div>
          </div>
          <div
            onClick={() => setChoice("product")}
            className={`${
              choice === "product" ? "active" : ""
            } manage__container--menu__item`}
          >
            <div className="menu-middle">Products</div>
          </div>
          <div
            onClick={() => setChoice("claim")}
            className={`${
              choice === "claim" ? "active" : ""
            } manage__container--menu__item`}
          >
            <div>Requests</div>
          </div>
          <div
            onClick={() => setChoice("soldProducts")}
            className={`${
              choice === "soldProducts" ? "active" : ""
            } manage__container--menu__item`}
          >
            <div className="menu-last">Products Sold</div>
          </div>
        </div>
        <div className="manage__container--content">{renderContent()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });
export default connect(mapStateToProps, { changeShowLoader })(Manage);
