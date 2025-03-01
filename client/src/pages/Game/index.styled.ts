import styled from "styled-components";
import { mediaQueryMobile, mediaQueryTablet } from "@/styles/mixins";

export const BackgroundWrapper = styled.div`
  position: relative;
  height: calc(100vh - 126px);
  overflow: hidden;
`;

export const GameContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;

  ${mediaQueryTablet()} {
    padding: ${({ theme }) => theme.spacing.md};
  }

  ${mediaQueryMobile()} {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;

  ${mediaQueryMobile()} {
    font-size: ${({ theme }) => theme.typography.fontSize.h2};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const Username = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;
