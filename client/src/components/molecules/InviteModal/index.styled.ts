import { mediaQueryMobileOrTablet } from "@/styles/mixins";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translate(-50%, -60%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  min-width: 400px;
  max-width: 90vw;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.3s ease-out;

  ${mediaQueryMobileOrTablet} {
    min-width: 90vw;
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surfaceLight};
  cursor: text;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ImageLoader = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const AvatarImage = styled.img<{ $isLoaded: boolean }>`
  width: 180px;
  height: 180px;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease-out;

  ${mediaQueryMobileOrTablet} {
    width: 140px;
    height: 140px;
  }
`;

export const AnimationWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing.xl} 0
    ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 180px;

  ${mediaQueryMobileOrTablet} {
    margin: ${({ theme }) => theme.spacing.lg} 0
      ${({ theme }) => theme.spacing.sm};
    min-height: 140px;
  }
`;
