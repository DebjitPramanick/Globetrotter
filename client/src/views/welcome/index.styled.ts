import styled, { keyframes, css } from "styled-components";
import { mediaQueryMobile, mediaQueryTablet } from "@/styles/mixins";

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

const shine = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const responsiveTitle = css`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.h2};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: ${({ theme }) => theme.typography.fontSize.h3};
  }
`;

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  height: 100dvh;
  padding: 0px ${({ theme }) => theme.spacing.lg};
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;

  ${mediaQueryMobile()} {
    padding: 0px ${({ theme }) => theme.spacing.sm};
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 1s ease-out;
  text-align: center;
  backdrop-filter: blur(12px);
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.colors.surface}30;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}40`};
  width: 100%;
  max-width: 400px;
  margin: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 8px 32px 0 ${({ theme }) => `${theme.colors.primary}10`};

  ${mediaQueryMobile()} {
    padding: ${({ theme }) => theme.spacing.md};
    margin: ${({ theme }) => theme.spacing.sm};
    max-width: 320px;
  }

  ${mediaQueryTablet()} {
    max-width: 360px;
  }
`;

export const Title = styled.h1`
  ${responsiveTitle}
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary},
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.primary}
  );
  background-size: 300% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ${shine} 5s ease infinite;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: -0.5px;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.body};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  ${mediaQueryMobile()} {
    gap: ${({ theme }) => theme.spacing.sm};
    max-width: 100%;
  }
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;

  ${mediaQueryMobile()} {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
    font-size: ${({ theme }) => theme.typography.fontSize.body};
  }

  ${mediaQueryTablet()} {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

export const OrDivider = styled.div`
  position: relative;
  text-align: center;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.small};

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: calc(50% - 20px);
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

export const GuestLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  opacity: 0.8;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
  }

  &:active {
    transform: translateY(1px);
  }
`;
