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
import { User } from "@/types";
import { userApi } from "@/api";
import { useRequestState } from "@/hooks";
import { RequestError } from "@/types/error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AppContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  user: User;
  setUser: (user: User) => void;
  createAnonymousUser: () => Promise<User | null>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState<User>({
    username: "",
    _id: "",
    createdAt: "",
    updatedAt: "",
  });

  const [fetchUserRequestStates, fetchUserRequestStatesHandler] =
    useRequestState<any>();
  const [
    createAnonymousUserRequestStates,
    createAnonymousUserRequestStatesHandler,
  ] = useRequestState<any>();

  const fetchUser = async () => {
    try {
      let userId = "";
      if (window) {
        userId = localStorage.getItem("userId") || "";
      }
      fetchUserRequestStatesHandler.pending();
      const response = await userApi.getCurrentUser({ id: userId });
      setUser(response.data);
      fetchUserRequestStatesHandler.fulfilled(response.data);
    } catch (error) {
      fetchUserRequestStatesHandler.rejected(new RequestError(error));
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  const handleSetUser = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("userId", newUser._id);
  };

  const generateUniqueAnonymousUsername = () => {
    const timestamp = Date.now().toString(36); // Convert timestamp to base36
    return `anonymous-${timestamp}`;
  };

  const createAnonymousUser = async () => {
    try {
      const uniqueUsername = generateUniqueAnonymousUsername();
      const response = await userApi.auth({
        username: uniqueUsername,
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating anonymous user:", error);
      return null;
    }
  };

  useEffect(() => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // useEffect(() => {
  //   // Load saved username
  //   const savedUsername = localStorage.getItem("username");
  //   if (savedUsername) {
  //     setUsernameState(savedUsername);
  //     router.push("/game");
  //   }
  // }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    isDarkMode,
    toggleTheme,

    user,
    setUser: handleSetUser,

    createAnonymousUser,
  };

  return (
    <AppContext.Provider value={value}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme={isDarkMode ? "dark" : "light"}
        />
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
