import { ReactNode } from "react";
import Header from "@/components/molecules/Header";
import { LayoutContainer, Main } from "./index.styled";
import { useApp } from "@/context/AppContext";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { username } = useApp();

  return (
    <LayoutContainer>
      {username && <Header />}
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

export default AppLayout;
