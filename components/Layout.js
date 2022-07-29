import { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import {
  contractAddress,
  checkMetamaskStatus,
  connectMetamask,
  firstFunc,
  listenToEvents,
} from "./configureMetamask";
import { FallingLines } from "react-loader-spinner";

import { connect } from "react-redux";
import axios from "axios";
import {
  changeContractInstance,
  changeLoad,
  changeCurrentAccount,
  changeMetamaskConnectFunction,
  changeMetamaskStatus,
  changeNetworkId,
  changeShowLoader,
} from "../redux/action";
import Header from "./Header";
import Loader from "./Loader";
import Alert from "./modals/alertModal";
import Flash from "./modals/flashModal";

const Layout = ({
  children,
  changeContractInstance,
  changeMetamaskConnectFunction,
  changeCurrentAccount,
  changeLoad,
  changeNetworkId,
  changeMetamaskStatus,
  changeShowLoader,
  state,
  router,
}) => {
  const {
    contractInstance,
    currentAccount,
    load,
    networkId,
    metamaskStatus,
    metamaskConnectFunction,
    showLoader,
    isLoggedIn,
  } = state;

  const [quote, setQuote] = useState({
    quote: "Please wait, while your data loads.",
    author: "Stud-Potato team",
  });
  const Router = useRouter();
  //default
  useEffect(() => {
    changeShowLoader(true);
    (async () => {
      firstFunc(
        changeContractInstance,
        changeCurrentAccount,
        changeNetworkId,
        changeMetamaskStatus
      );
      checkMetamaskStatus(
        changeMetamaskStatus,
        changeCurrentAccount,
        changeNetworkId
      );
      getQuotes();
      changeMetamaskConnectFunction(connectMetamask);
    })();
    changeShowLoader(false);
  }, []);
  // for updating the change when metamask configuration changes !!
  useEffect(() => {
    // function to update the values of state
    //    getContractData();
    // for listening of events
    //    listenToEvents(contract);
  }, [currentAccount, contractInstance, load]);

  const getQuotes = async () => {
    const response = await axios.get(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    );

    const totalQuotes = [
      ...response.data.quotes,
      {
        quote: "Haters gonna hate, potatoes gonna potate...",
        author: "Stud-Potato team",
      },
    ];

    setQuote(totalQuotes[Math.floor(Math.random() * (totalQuotes.length - 1))]);
  };

  // redirecting the page to login page when the user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      if (router.pathname !== "/login" && router.pathname !== "/signup")
        Router.push("/login");
    } else {
      Router.push("/");
    }
  }, [isLoggedIn ? "dummy-string" : router.pathname, isLoggedIn]);
  return (
    <>
      <>
        {router.pathname !== "/login" && router.pathname !== "/signup" && (
          <Header />
        )}
        {children}
        <Loader setShow={changeShowLoader} show={showLoader}>
          <div className="modal-loader-body">
            <div className="modal-loader-body__header">Processing...</div>
            <div className="modal-loader-body__loader">
              <FallingLines color="#30475e" width="10rem" />
            </div>
            <div className="modal-loader-body__text">
              <div className="modal-loader-body__text--quote">
                {`"${quote.quote}"`}
              </div>
              <div className="modal-loader-body__text--author">
                -{quote.author}
              </div>
            </div>
          </div>
        </Loader>
        <Alert />
        <Flash />
      </>
    </>
  );
};

const mapStateToState = (state) => ({ state });
export default withRouter(
  connect(mapStateToState, {
    changeContractInstance,
    changeMetamaskConnectFunction,
    changeCurrentAccount,
    changeLoad,
    changeNetworkId,
    changeMetamaskStatus,
    changeShowLoader,
  })(Layout)
);
