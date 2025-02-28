import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Play, BarChart2 } from "react-feather";
import { Avatar } from "@/components/atoms";
import {
  HeaderContainer,
  LeftSection,
  RightSection,
  Title,
  AvatarMenu,
  MenuItem,
  MenuDivider,
  ThemeToggleWrapper,
  IconWrapper,
} from "./index.styled";
import { useRouter } from "next/router";
import { useApp } from "@/context/AppContext";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleTheme } = useApp();
  const router = useRouter();
  const { username } = useApp();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <Title>Destination Quest</Title>
      </LeftSection>
      <RightSection ref={menuRef}>
        <Avatar
          name={username || ""}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <AvatarMenu isOpen={isMenuOpen}>
          <MenuItem onClick={() => handleNavigation("/game")}>
            <Play size={18} />
            Game
          </MenuItem>
          <MenuItem onClick={() => handleNavigation("/stats")}>
            <BarChart2 />
            Stats
          </MenuItem>
          <MenuDivider />
          <ThemeToggleWrapper onClick={toggleTheme}>
            <IconWrapper isDarkMode={isDarkMode}>
              <Moon size={18} />
              <Sun size={18} />
            </IconWrapper>
            Dark Mode
          </ThemeToggleWrapper>
        </AvatarMenu>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
