import { Globals } from "../styles/globals";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { useStore } from "../store";
import "normalize.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&family=Source+Code+Pro:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={{}}>
        <Globals />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
