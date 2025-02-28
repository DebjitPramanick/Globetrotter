import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  position: relative;
  padding: ${({ theme }) => theme.spacing.xs} 0;

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const ThemeToggle = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    transition: all 0.3s ease;
  }
`;

export const IconWrapper = styled.div<{ isDarkMode: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    position: absolute;
    opacity: ${({ isDarkMode }) => (isDarkMode ? 1 : 0)};
    transform: ${({ isDarkMode }) =>
      isDarkMode ? "scale(1) rotate(0)" : "scale(0) rotate(-180deg)"};
    transition: all 0.3s ease;

    &:last-child {
      opacity: ${({ isDarkMode }) => (isDarkMode ? 0 : 1)};
      transform: ${({ isDarkMode }) =>
        isDarkMode ? "scale(0) rotate(180deg)" : "scale(1) rotate(0)"};
    }
  }
`;
