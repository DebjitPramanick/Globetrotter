import { css } from "styled-components";

export const mediaQuerySmallScreen = () => "@media (max-width: 599px)";
export const mediaQueryMobile = () => "@media (max-width: 767px)";
export const mediaQueryTablet = () =>
  "@media (min-width: 768px) and (max-width: 1024px)";
export const mediaQueryMobileOrTablet = () => "@media (max-width: 1024px)";
export const mediaQueryTabletOrDesktop = () => "@media (min-width: 768px)";
export const mediaQueryDesktop = () => "@media (min-width: 1025px)";

export const scrollbarCss = () => css`
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.primary}40;
    }
  }
`;
