import Link from "next/link";
import { useState } from "react";
import landingPageImage from "../assets/loginImage.jpg";
import axios from "../services/axios";
import { connect } from "react-redux";
import {
  changeAlertMessage,
  changeShowAlert,
  changeJwtToken,
  changeIsLoggedIn,
  changeFlashMessage,
  changeShowFlash,
  changeUserInfo,
} from "../redux/action";
import Utils from "../components/Utils";

const Login = ({
  state,
  changeAlertMessage,
  changeShowAlert,
  changeIsLoggedIn,
  changeJwtToken,
  changeFlashMessage,
  changeShowFlash,
  changeUserInfo,
}) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {
    if (!email || !pass) {
      changeAlertMessage("Fill all the fields !!");
      changeShowAlert(true);
    }
    try {
      await axios
        .post("/login", { email, password: pass })
        .then((response) => {
          const data = response.data.data;
          changeJwtToken(data.accessToken);
          changeUserInfo(data.user);
          changeIsLoggedIn(true);
          changeFlashMessage("Logged in Successfully !!");
          changeShowFlash(true);
        })
        .catch((err) => {
          const resp = err.response.data;
          changeAlertMessage(resp.message);
          changeShowAlert(true);
        });
    } catch (err) {
      return Utils.handleError(err);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          className="login__container--first"
          src={landingPageImage.src}
          alt="landing page image"
        />
        <div className="login__container--second">
          <div className="login__container--second__heading">
            Happy to have you back !!
          </div>
          <div className="login__container--second__text-field">
            <div className="login__container--second__text-field--item">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Type here..."
                id="email"
              />
            </div>
            <div className="login__container--second__text-field--item">
              <label htmlFor="pss">Password</label>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="Type here..."
                id="pss"
              />
            </div>
          </div>
          <div className="login__container--second__button">
            <button
              onClick={handleLogin}
              className="button login__container--second__button--btn-login"
            >
              Login
            </button>
            <div className="login__container--second__button--or">
              <div className="hr-line"></div>
              <div className="text-or">Or</div>
              <div className="hr-line"></div>
            </div>
            <Link href="/signup">
              <button className=" button login__container--second__button--btn-signup">
                Signup
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state });
export default connect(mapStateToProps, {
  changeAlertMessage,
  changeShowAlert,
  changeIsLoggedIn,
  changeJwtToken,
  changeFlashMessage,
  changeShowFlash,
  changeUserInfo,
})(Login);
