import { AppProps } from "next/app";
import { GlobalStyle } from "@/styles/index.styled";
import { AppContextProvider } from "@/context/AppContext";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Globetrotter</title>
        <meta name="description" content="Globetrotter" />
      </Head>
      <AppContextProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AppContextProvider>
    </>
  );
};

export default App;
