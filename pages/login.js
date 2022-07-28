import Image from "next/image";
import Link from "next/link";
import React from "react";
import landingPageImage from "../assets/loginImage.jpg";

const Login = () => {
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
              <input type="email" placeholder="Type here..." id="email" />
            </div>
            <div className="login__container--second__text-field--item">
              <label htmlFor="pss">Password</label>
              <input type="password" placeholder="Type here..." id="pss" />
            </div>
          </div>
          <div className="login__container--second__button">
            <Link href="/login">
              <button className="button login__container--second__button--btn-login">
                Login
              </button>
            </Link>
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

export default Login;
