import { Provider } from "react-redux";
import Layout from "../components/Layout";
import { wrapper, store, persistor } from "../redux/init";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout>
          <Head>
            <title>Next-Hardhat template</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
