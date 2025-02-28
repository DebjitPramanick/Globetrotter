import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      text: string;
      textSecondary: string;
      border: string;
      error: string;
      success: string;
      accent: string;
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
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}

export const lightTheme: DefaultTheme = {
  colors: {
    primary: "#2563eb",
    secondary: "#3b82f6",
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#1e293b",
    textSecondary: "#64748b",
    border: "#e2e8f0",
    error: "#ef4444",
    success: "#22c55e",
    accent: "#818cf8",
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
  breakpoints: {
    xs: "320px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
};

export const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    primary: "#3b82f6",
    secondary: "#60a5fa",
    background: "#0f172a",
    surface: "#1e293b",
    text: "#f8fafc",
    textSecondary: "#94a3b8",
    border: "#334155",
    error: "#ef4444",
    success: "#22c55e",
    accent: "#818cf8",
  },
};
