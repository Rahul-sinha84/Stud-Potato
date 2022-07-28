import Link from "next/link";
import React, { useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { connect } from "react-redux";
import DropDown from "./DropDown";
import Utils from "./Utils";
import { changeMetamaskStatus } from "../redux/action";

const Header = ({ state, changeMetamaskStatus }) => {
  const name = "Rahul Sinha";
  const { metamaskStatus, metamaskConnectFunction, currentAccount } = state;
  const [showDropDown, setShowDropDown] = useState(false);

  const renderDropDownItems = () => (
    <>
      <div className="dropdown__container--item">
        <div className="name">
          Hello, <b>{name}</b>
        </div>
      </div>
      <div className="dropdown__container--item">
        <div className="metamask">
          {metamaskStatus ? (
            <>
              <div className="metamask__address">
                {Utils.shortHash(currentAccount)}
              </div>
              {/* <div className="metamask__btn">
                <button className="button metamask__btn--disconnect">
                  Disconnect
                </button>
              </div> */}
            </>
          ) : (
            <>
              <div className="metamask__text">Metamask not Connected</div>
              <div className="metamask__btn">
                <button
                  onClick={() => metamaskConnectFunction(changeMetamaskStatus)}
                  className="button metamask__btn--connect"
                >
                  Connect
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="dropdown__container--item">
        <div className="logout-btn">
          <button className="button">
            Logout
            <HiOutlineLogout size={25} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__container--first">
          <Link href="/">
            <div className="header__container--first__item">Stud-Potato</div>
          </Link>
        </div>
        <div className="header__container--second">
          <Link href="/shop">
            <div className="header__container--second__item">Shop</div>
          </Link>
          <Link href="/manage">
            <div className="header__container--second__item">Manage</div>
          </Link>
          <Link href="/consumer">
            <div className="header__container--second__item">
              Your Purchases
            </div>
          </Link>
        </div>
        <div className="header__container--third">
          <div>
            <div
              onClick={() => setShowDropDown(!showDropDown)}
              className="header__container--third__item"
            >
              <BsPersonFill size={35} />
            </div>
            <DropDown toShow={showDropDown}>{renderDropDownItems()}</DropDown>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });
export default connect(mapStateToProps, { changeMetamaskStatus })(Header);
