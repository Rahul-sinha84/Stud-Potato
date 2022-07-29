import React, { useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { BsFillCheckCircleFill } from "react-icons/bs";
import {
  changeMetamaskStatus,
  changeShowAlert,
  changeAlertMessage,
  changeShowLoader,
  changeFlashMessage,
  changeShowFlash,
} from "../redux/action";
import axios from "../services/axios";

const Signup = ({
  state,
  changeMetamaskStatus,
  changeShowAlert,
  changeAlertMessage,
  changeShowLoader,
  changeFlashMessage,
  changeShowFlash,
}) => {
  const {
    contractInstance,
    metamaskConnectFunction,
    metamaskStatus,
    currentAccount,
  } = state;

  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfrmPassword, setCnfrmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isSeller, setIsSeller] = useState(true);
  // const [accountAddress, setAccountAddress] = useState(currentAccount);

  const signup = async () => {
    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !cnfrmPassword ||
      !address ||
      !phone
    ) {
      changeAlertMessage("Please fill all the fields !!");
      changeShowAlert(true);
      return;
    }
    if (!currentAccount) {
      changeAlertMessage("Connect you metamask account to continue !!");
      changeShowAlert(true);
    } else if (password !== cnfrmPassword) {
      changeAlertMessage(
        "Confirm Password is not matching with your Password !!"
      );
      changeShowAlert(true);
      return;
    }
    await axios
      .post("/signup", {
        nameOfStore: name,
        email,
        username,
        password,
        address: currentAccount,
        isSeller,
        phone,
        storeAddress: address,
      })
      .then((res) => {
        changeFlashMessage("Registered Successfully !!");
        changeShowFlash(true);
        router.push("/login");
      })
      .catch((err) => {
        const resp = err.response.data;
        changeAlertMessage(resp.message);
        changeShowAlert(true);
      });
  };
  const handleRadioChange = (e) => {
    setIsSeller(e.target.value === "seller" ? true : false);
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__container--title">Fill up the details</div>
        <div className="signup__container--content">
          <div className="signup__container--content__item">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Type here..."
              id="name"
            />
          </div>
          <div className="signup__container--content__item">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Type here..."
              id="username"
            />
          </div>
          <div className="signup__container--content__item">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Type here..."
              id="email"
            />
          </div>
          <div className="signup__container--content__item">
            <label htmlFor="psswrd">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Type here..."
              id="psswrd"
            />
          </div>
          <div className="signup__container--content__item">
            <label htmlFor="cnfrmpsswrd">Confirm Password</label>
            <input
              value={cnfrmPassword}
              onChange={(e) => setCnfrmPassword(e.target.value)}
              type="password"
              placeholder="Type here..."
              id="cnfrmpsswrd"
            />
          </div>
          <div className="signup__container--content__item">
            <label htmlFor="address">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Type here..."
              id="address"
            />
          </div>
          <div className="signup__container--content__item">
            <label htmlFor="phno">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Type here..."
              id="phno"
            />
          </div>
          <div className="signup__container--content__item-radio">
            <div className="radio-container">
              <div>
                <input
                  className="radio-input"
                  name="isSeller"
                  type="radio"
                  id="yes"
                  value="seller"
                  checked={isSeller}
                  onChange={handleRadioChange}
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
                  value="consumer"
                  checked={!isSeller}
                  onChange={handleRadioChange}
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
          <button onClick={signup} className="button submit-btn">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });
export default connect(mapStateToProps, {
  changeMetamaskStatus,
  changeShowAlert,
  changeAlertMessage,
  changeShowLoader,
  changeFlashMessage,
  changeShowFlash,
})(Signup);
