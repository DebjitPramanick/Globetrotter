import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Play, BarChart2, Share2, LogOut } from "react-feather";
import { Avatar, Credit } from "@/components/atoms";
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
  ChallengeButton,
  MobileMenuItem,
} from "./index.styled";
import { useRouter } from "next/router";
import { useApp } from "@/context/AppContext";
import { InviteModal } from "@/components/molecules";
import { useTheme } from "styled-components";

const Header = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleTheme } = useApp();
  const router = useRouter();
  const { user, setUser } = useApp();
  const theme = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

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

  const handleChallengeClick = () => {
    if (!user.username || user.username.toLowerCase().startsWith("anonymous")) {
      router.push("/welcome");
      return;
    }
    setShowInviteModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUser({
      username: "",
      _id: "",
      createdAt: "",
      updatedAt: "",
    });
    setIsMenuOpen(false);
    router.push("/welcome");
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <div>
          <Title>Globetrotter</Title>
          <Credit style={{ marginTop: theme.spacing.sm }} />
        </div>
      </LeftSection>
      <RightSection ref={menuRef}>
        <ChallengeButton onClick={handleChallengeClick}>
          <Share2 />
          Challenge Friend
        </ChallengeButton>
        <Avatar
          name={user.username || "A"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <AvatarMenu isOpen={isMenuOpen}>
          <MenuItem onClick={() => handleNavigation("/")}>
            <Play size={18} />
            Game
          </MenuItem>
          <MenuItem onClick={() => handleNavigation("/stats")}>
            <BarChart2 />
            Stats
          </MenuItem>
          <MobileMenuItem onClick={handleChallengeClick}>
            <Share2 size={18} />
            Challenge Friend
          </MobileMenuItem>
          <MenuDivider />
          <ThemeToggleWrapper onClick={toggleTheme}>
            <IconWrapper isDarkMode={isDarkMode}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </IconWrapper>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </ThemeToggleWrapper>
          <MenuDivider />
          <MenuItem onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </MenuItem>
        </AvatarMenu>
      </RightSection>

      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
      />
    </HeaderContainer>
  );
};

export default Header;
