import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/theme";
import { useRouter } from "next/router";

interface AppContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  username: string | null;
  setUsername: (username: string) => void;
  clearUsername: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsernameState] = useState<string | null>(null);

  useEffect(() => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Load saved username
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsernameState(savedUsername);
      router.push("/game");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  const setUsername = (newUsername: string) => {
    setUsernameState(newUsername);
    localStorage.setItem("username", newUsername);
  };

  const clearUsername = () => {
    setUsernameState(null);
    localStorage.removeItem("username");
  };

  const value = {
    isDarkMode,
    toggleTheme,
    username,
    setUsername,
    clearUsername,
  };

  return (
    <AppContext.Provider value={value}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppContextProvider");
  }
  return context;
};
