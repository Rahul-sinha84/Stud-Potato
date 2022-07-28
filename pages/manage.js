import React, { useState, useEffect } from "react";
import ArticleDisplay from "../components/articleDisplay";
import Product from "../components/Product";
import Request from "../components/Request";
import RequestContainer from "../components/requestDisplay";
import SoldProductCard from "../components/SoldProductCard";
import Warranty from "../components/Warranty";
import withAuth from "../components/withAuth";

const dummyRequests = [
  {
    product: {
      imgSrc:
        "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    description:
      "Commodo sunt est enim nostrud excepteur officia in veniam incididunt consectetur laborum magna ad.",
  },
  {
    product: {
      imgSrc:
        "https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHwwfDB8YmxhY2t8&auto=format&fit=crop&w=500&q=60",
    },
    description:
      "Qui irure deserunt ullamco velit. Fugiat labore mollit labore irure dolore consequat quis reprehenderit cillum. Enim dolore consequat nisi voluptate proident. Occaecat do ex excepteur qui sunt.",
  },
  {
    product: {
      imgSrc:
        "https://images.unsplash.com/photo-1518894781321-630e638d0742?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHwyfDB8YmxhY2t8&auto=format&fit=crop&w=500&q=60",
    },
    description:
      "Anim enim proident sint officia tempor do amet irure magna ullamco velit cupidatat. Eu non non sint aute irure fugiat sint deserunt excepteur occaecat magna est. Nostrud amet excepteur labore minim fugiat reprehenderit ullamco. Non deserunt aute consectetur dolore cupidatat pariatur consectetur do aute ipsum exercitation ipsum enim. Eiusmod occaecat excepteur dolor amet aute minim.",
  },
  {
    product: {
      imgSrc:
        "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    description: "This product is not as good as expected !!",
  },
  {
    product: {
      imgSrc:
        "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    description: "This product is not as good as expected !!",
  },
  {
    product: {
      imgSrc:
        "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    description: "This product is not as good as expected !!",
  },
];
const warranties = [
  {
    name: "Warranty 1",
    validity: "1721769685626",
    itemType: "Shoes",
  },
  {
    name: "Warranty 1",
    validity: "1721769685626",
    itemType: "Shoes",
  },
  {
    name: "Warranty 1",
    validity: "1721769685626",
    itemType: "Shoes",
  },
  {
    name: "Warranty 1",
    validity: "1721769685626",
    itemType: "Shoes",
  },
  {
    name: "Warranty 1",
    validity: "1721769685626",
    itemType: "Shoes",
  },
  {
    name: "Warranty 1",
    validity: "1721769685626",
    itemType: "Shoes",
  },
  {
    name: "Warranty 1",
    validity: "1721769685626",
    itemType: "Shoes",
  },
];
const dummySoldProduct = [
  {
    imgSrc:
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80`",
    name: "Formal Shirt",
    price: "1099",
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
    name: "Formal Shirt",
    price: "1099",
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    name: "Formal Shirt",
    price: "1099",
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1563389234808-52344934935c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    name: "Formal Shirt",
    price: "1099",
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1599900554895-5e0fc7bbc9c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    name: "Formal Shirt",
    price: "1099",
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1603251578711-3290ca1a0187?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    name: "Formal Shirt",
    price: "1099",
  },
];

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
const Manage = () => {
  const [warrantyCards, setWarrantyCards] = useState([]);
  const [productCards, setProductCards] = useState([]);
  const [requestCards, setRequestCards] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [choice, setChoice] = useState("warranty");

  const renderContent = () => {
    switch (choice) {
      case "warranty": {
        return <ArticleDisplay isProduct={false} articles={warrantyCards} />;
      }
      case "product": {
        return (
          <ArticleDisplay
            warranty={warranties}
            isProduct={true}
            articles={productCards}
          />
        );
      }
      case "claim": {
        return <RequestContainer requests={requestCards} />;
      }
      case "soldProducts": {
        return <RequestContainer requests={soldProducts} />;
      }
      default: {
        return null;
      }
    }
  };
  const getProductCards = () => {
    return dummySoldProducts.map((val, ind) => (
      <div key={ind}>
        <Product warranties={warranties} isEdit={true} product={val} />
      </div>
    ));
  };
  const getWarrantyCards = () => {
    return warranties.map((val, ind) => (
      <div key={ind}>
        <Warranty item={val} />
      </div>
    ));
  };
  const getRequestCards = () => {
    return dummyRequests.map((val, ind) => (
      <div key={ind}>
        <Request request={val} />
      </div>
    ));
  };
  const getSoldProductCards = () => {
    return dummySoldProducts.map((val, ind) => (
      <div key={ind}>
        <SoldProductCard SoldProducts={val} />
      </div>
    ));
  };

  useEffect(() => {
    setWarrantyCards(getWarrantyCards());
    setProductCards(getProductCards());
    setRequestCards(getRequestCards());
    setSoldProducts(getSoldProductCards());
  }, []);
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

export default Manage;
