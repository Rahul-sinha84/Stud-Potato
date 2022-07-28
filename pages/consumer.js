import React, { useState, useEffect } from "react";
import ArticleDisplay from "../components/articleDisplay";
import Product from "../components/Product";
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

const Consumer = () => {
  const [choice, setChoice] = useState("products");
  const [products, setProducts] = useState([]);

  const renderContainer = () => {
    if (choice === "products")
      return (
        <ArticleDisplay
          isConsumer={true}
          isProduct={true}
          articles={products}
        />
      );
  };

  useEffect(() => {
    setProducts(getProductCards());
  }, []);

  const getProductCards = () => {
    return dummySoldProducts.map((val, ind) => (
      <div key={ind}>
        <Product product={val} />
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

export default Consumer;
