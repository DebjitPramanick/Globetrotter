import { ReactNode } from "react";
import Header from "@/components/molecules/Header";
import { LayoutContainer, Main } from "./index.styled";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

export default AppLayout;
