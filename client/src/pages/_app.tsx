import { AppProps } from "next/app";
import { GlobalStyle } from "@/styles/index.styled";
import { AppContextProvider } from "@/context/AppContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppContextProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </AppContextProvider>
  );
};

export default App;
