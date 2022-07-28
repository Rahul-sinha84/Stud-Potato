import React from "react";
import { connect } from "react-redux";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { changeMetamaskStatus } from "../redux/action";

const Signup = ({ state, changeMetamaskStatus }) => {
  const { contractInstance, metamaskConnectFunction, metamaskStatus } = state;

  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__container--title">Fill up the details</div>
        <div className="signup__container--content">
          <div className="signup__container--content__item">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="Type here..." id="name" />
          </div>
          <div className="signup__container--content__item">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Type here..." id="username" />
          </div>
          <div className="signup__container--content__item">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Type here..." id="email" />
          </div>
          <div className="signup__container--content__item">
            <label htmlFor="psswrd">Password</label>
            <input type="password" placeholder="Type here..." id="psswrd" />
          </div>
          <div className="signup__container--content__item">
            <label htmlFor="cnfrmpsswrd">Confirm Password</label>
            <input
              type="password"
              placeholder="Type here..."
              id="cnfrmpsswrd"
            />
          </div>
          <div className="signup__container--content__item">
            <label htmlFor="address">Address</label>
            <input type="text" placeholder="Type here..." id="address" />
          </div>
          <div className="signup__container--content__item">
            <label htmlFor="phno">Phone</label>
            <input type="text" placeholder="Type here..." id="phno" />
          </div>
          <div className="signup__container--content__item-radio">
            <div className="radio-container">
              <div>
                <input
                  className="radio-input"
                  name="isSeller"
                  type="radio"
                  id="yes"
                />
                <label htmlFor="yes">
                  <div className="radio-box__container">
                    <div className="radio-inner"></div>
                  </div>
                  <div className="radio-box__title">Seller</div>
                </label>
              </div>
              <div>
                <input
                  className="radio-input"
                  name="isSeller"
                  type="radio"
                  id="no"
                />
                <label htmlFor="no">
                  <div className="radio-box__container">
                    <div className="radio-inner"></div>
                  </div>
                  <div className="radio-box__title">Consumer</div>
                </label>
              </div>
            </div>
          </div>
          <div className="signup__container--content__item">
            <div className="metamask-connect">
              {metamaskStatus ? (
                <div className="metamask-connect__true">
                  <div className="metamask-connect__true--icon">
                    <BsFillCheckCircleFill color="green" size={45} />
                  </div>
                  <div className="metamask-connect__true--text">
                    {" "}
                    You are successfully connected with metamask !!
                  </div>
                </div>
              ) : (
                <div className="metamask-connect__false">
                  <button
                    onClick={() =>
                      metamaskConnectFunction(changeMetamaskStatus)
                    }
                    className="button metamask-connect__false--btn"
                  >
                    Connect Metamask
                  </button>
                  <div className="metamask-connect__false--text">
                    *To proceed you should connect your metamask wallet !!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="signup__container--submit">
          <button className="button submit-btn">Signup</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });
export default connect(mapStateToProps, { changeMetamaskStatus })(Signup);
