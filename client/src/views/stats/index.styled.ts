import styled, { keyframes } from "styled-components";
import { Button } from "@/components/atoms";
import { mediaQueryMobileOrTablet } from "@/styles/mixins";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};

  ${mediaQueryMobileOrTablet} {
    margin: 0;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;

  &::after {
    content: "";
    display: block;
    width: 60px;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
    margin: ${({ theme }) => theme.spacing.md} auto 0;
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  min-height: 400px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
  padding: ${({ theme }) => theme.spacing.xl};

  svg {
    color: ${({ theme }) => theme.colors.error};
    opacity: 0.8;
  }
`;

export const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;

  span {
    display: block;
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

export const RetryButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.md};
`;
