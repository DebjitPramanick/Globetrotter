import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      border: string;
      error: string;
      success: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    typography: {
      fontFamily: string;
      fontSize: {
        small: string;
        body: string;
        h1: string;
        h2: string;
        h3: string;
      };
      fontWeight: {
        regular: number;
        medium: number;
        bold: number;
      };
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
  }
}

export const lightTheme: DefaultTheme = {
  colors: {
    primary: "#007AFF",
    secondary: "#5856D6",
    background: "#FFFFFF",
    text: "#000000",
    border: "#E5E5EA",
    error: "#FF3B30",
    success: "#34C759",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  typography: {
    fontFamily: "Manrope, sans-serif",
    fontSize: {
      small: "0.875rem",
      body: "1rem",
      h1: "2rem",
      h2: "1.5rem",
      h3: "1.25rem",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
};

export const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    primary: "#0A84FF",
    secondary: "#5E5CE6",
    background: "#000000",
    text: "#FFFFFF",
    border: "#38383A",
    error: "#FF453A",
    success: "#32D74B",
  },
};
