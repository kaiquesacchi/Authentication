import { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../../lib/apolloClient";

import { ThemeProvider } from "styled-components";
import light from "../styles/themes/light";
import GlobalStyles from "../styles/global";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
