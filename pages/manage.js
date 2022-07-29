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
