import styled, { createGlobalStyle } from "styled-components";
import { scrollbarCss } from "./mixins";

export const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
    ${scrollbarCss};
  }

  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    transition: all 0.2s ease-in-out;      
  }
`;

export const AppContainer = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
`;
