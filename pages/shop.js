import React from "react";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Product from "../components/Product";

const dummyProd = [
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
const Shop = () => {
  const [products, setProducts] = useState([]);

  const allProducts = () => {
    return dummyProd.map((val, ind) => (
      <div key={ind}>
        <Product product={val} />
      </div>
    ));
  };
  useEffect(() => {
    setProducts(allProducts());
  }, []);
  return (
    <div className="shop">
      <div className="shop__container">
        <div className="shop__container--search">
          <div className="search-bar">
            <input
              placeholder="Search for products"
              type="text"
              className="search-bar__input"
            />
            <div className="search-bar__btn">
              <BiSearch color="#777" size={25} />
            </div>
          </div>
        </div>
        <div className="shop__container--main">
          <div className="shop__container--main__container">{products}</div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
