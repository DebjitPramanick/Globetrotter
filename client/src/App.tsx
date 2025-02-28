import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";
import { ThemeProvider } from "./context/ThemeContext";
import Welcome from "./pages/Welcome";
import Game from "./pages/Game";
import Stats from "./pages/Stats";
import Header from "./components/Header";
import { GlobalStyle, AppContainer } from "./App.styled";
import { useCurrentRoute } from "./hooks/useCurrentRoute";

const HeaderWrapper = () => {
  const currentRoute = useCurrentRoute();
  const shouldShowHeader = currentRoute !== "/";

  return shouldShowHeader ? <Header /> : null;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <GlobalStyle />
        <AppContainer>
          <HeaderWrapper />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/game" element={<Game />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
