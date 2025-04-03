import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      surfaceLight: string;
      surfaceDark: string;
      text: string;
      textSecondary: string;
      border: string;
      error: string;
      success: string;
      accent: string;
      shimmer: {
        base: string;
        highlight: string;
      };
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
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
  }
}

const baseTheme = {
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  typography: {
    fontFamily: "Manrope, sans-serif",
    fontSize: {
      small: "12px",
      body: "14px",
      h3: "18px",
      h2: "24px",
      h1: "32px",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  breakpoints: {
    xs: "320px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
  shadows: {
    small: "0 2px 8px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 16px rgba(0, 0, 0, 0.1)",
    large: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
};

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  colors: {
    background: "#F5F5F5",
    surface: "#FFFFFF",
    surfaceLight: "#FFFFFF",
    surfaceDark: "#F8FAFC",
    primary: "#6366F1",
    secondary: "#8B5CF6",
    success: "#86EFAC",
    error: "#FCA5A5",
    text: "#1F2937",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    accent: "#F97316",
    shimmer: {
      base: "#CBD5E1",
      highlight: "#F1F5F9",
    },
  },
};

export const darkTheme: DefaultTheme = {
  ...baseTheme,
  colors: {
    background: "#111827",
    surface: "#1F2937",
    surfaceLight: "#374151",
    surfaceDark: "#111827",
    primary: "#818CF8",
    secondary: "#A78BFA",
    success: "#86EFAC",
    error: "#FCA5A5",
    text: "#F9FAFB",
    textSecondary: "#9CA3AF",
    border: "#374151",
    accent: "#FB923C",
    shimmer: {
      base: "#1F2937",
      highlight: "#374151",
    },
  },
  shadows: {
    small: "0 2px 8px rgba(0, 0, 0, 0.3)",
    medium: "0 4px 16px rgba(0, 0, 0, 0.3)",
    large: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
};

// Add toast styles to match your theme
export const toastTheme = {
  dark: {
    background: darkTheme.colors.surface,
    text: darkTheme.colors.text,
    error: darkTheme.colors.error,
  },
};
