import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Header from "./components/Header";
import { GlobalStyle, AppContainer } from "./App.styled";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <GlobalStyle />
        <AppContainer>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
