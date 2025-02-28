import { useTheme } from "../../context/ThemeContext";
import { Moon, Sun } from "react-feather";
import {
  Nav,
  NavLinks,
  StyledLink,
  ThemeToggle,
  IconWrapper,
} from "./index.styled";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Nav>
      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/stats">Stats</StyledLink>
      </NavLinks>
      <ThemeToggle
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <IconWrapper isDarkMode={isDarkMode}>
          <Moon size={20} />
          <Sun size={20} />
        </IconWrapper>
      </ThemeToggle>
    </Nav>
  );
};

export default Header;
