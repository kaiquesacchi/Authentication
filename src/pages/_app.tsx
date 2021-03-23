import { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../../lib/apolloClient";

import { ThemeProvider } from "styled-components";
import light from "../styles/themes/light";
import GlobalStyles from "../styles/global";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
