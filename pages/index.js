import React from "react";
import Link from "next/link";
import HeaderImage from "../assets/homePage.jpg";
import card1 from "../assets/homePage1.jpg";
import card2 from "../assets/homePage2.jpg";
import card3 from "../assets/homePage3.jpg";
// import card3 from "../assets/homePage3.jpg";

const Main = () => {
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__container--header">
          <img alt="image" src={HeaderImage.src} />
          <div className="home__container--header--content">
            <div className="home__container--header--content__heading">
              Collection 2022
            </div>
            <div className="home__container--header--content__text">
              New Arrivals
            </div>
            <div className="home__container--header--content__button">
              <Link href="/shop">
                <button className="button">Shop now</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="home__container--body">
          <div className="home-product">
            <div className="home-product__item">
              <img src={card1.src} alt="card image" />
              <div className="home-product__item--text">
                Get Digital NFT for your products
              </div>
            </div>
            <div className="home-product__dots">
              <div className="home-product__dots--item"></div>
              <div className="home-product__dots--item"></div>
              <div className="home-product__dots--item"></div>
            </div>
            <div className="home-product__item">
              <img src={card2.src} alt="card image" />
              <div className="home-product__item--text">
                10 Days return policy
              </div>
            </div>
            <div className="home-product__dots">
              <div className="home-product__dots--item"></div>
              <div className="home-product__dots--item"></div>
              <div className="home-product__dots--item"></div>
            </div>
            <div className="home-product__item">
              <img src={card3.src} alt="card image" />
              <div className="home-product__item--text">
                Get 100% certified products at best prices
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default WithAuth({ WrappedComponent: Main });
// export default <WithAuth WrappedComponent={Main} />;
export default Main;
