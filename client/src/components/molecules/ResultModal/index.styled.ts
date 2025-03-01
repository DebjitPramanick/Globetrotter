import styled, { keyframes, css } from "styled-components";
import { Button } from "@/components/atoms";
import { mediaQueryMobileOrTablet } from "@/styles/mixins";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

const scaleIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const floatIn = keyframes`
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const popIn = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const zoomOut = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const sadBounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

export const ModalOverlay = styled.div`
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
  z-index: 2;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContainer = styled.div<{ $isCorrect: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  min-width: 400px;
  max-width: 80vw;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid
    ${({ theme, $isCorrect }) =>
      $isCorrect ? theme.colors.success : theme.colors.error};
  animation: ${slideIn} 0.3s ease-out;

  ${mediaQueryMobileOrTablet} {
    min-width: 90vw;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}10`};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  text-align: center;
`;

export const ModalDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  text-align: center;
  line-height: 1.5;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const ActionButton = styled(Button)`
  flex: 1;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const StatValue = styled.div<{ $type: "correct" | "wrong" }>`
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme, $type }) =>
    $type === "correct" ? theme.colors.success : theme.colors.error};
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const FeedbackContainer = styled.div<{ $isCorrect?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme, $isCorrect }) =>
    $isCorrect ? theme.colors.success : theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  svg {
    width: 32px;
    height: 32px;
    animation: ${({ $isCorrect }) =>
      $isCorrect
        ? css`
            ${scaleIn} 0.5s ease-out
          `
        : css`
            ${sadBounce} 2s ease-in-out infinite
          `};
  }

  span {
    animation: ${({ $isCorrect }) =>
      $isCorrect
        ? css`
            ${fadeIn} 0.5s ease-out
          `
        : css`
            ${shake} 0.5s ease-in-out
          `};
  }
`;

export const StatsMessage = styled.div<{ $isCorrect: boolean }>`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  .highlight {
    display: inline-block;
    color: ${({ theme, $isCorrect }) =>
      $isCorrect ? theme.colors.success : theme.colors.error};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    animation: ${scaleIn} 0.5s ease-out forwards;
    animation-delay: 0.3s;
    opacity: 0;
  }

  .text {
    display: inline-block;
    animation: ${floatIn} 0.5s ease-out forwards;
    animation-delay: 0.5s;
    opacity: 0;
  }
`;

export const FunFactContainer = styled.div`
  text-align: center;
  margin: ${({ theme }) => theme.spacing.sm} auto;
  max-width: 400px;

  .label {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    animation: ${popIn} 0.5s ease-out forwards;
  }

  .fact {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.fontSize.h3};
    line-height: 1.5;
    animation: ${fadeSlideUp} 0.5s ease-out forwards;
    animation-delay: 0.3s;
    opacity: 0;
  }
`;

export const CorrectAnswerContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.sm} 0;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => `${theme.colors.error}15`};
  border: 1px solid ${({ theme }) => `${theme.colors.error}30`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-align: center;
  animation: ${zoomOut} 0.5s ease-out forwards;
  animation-delay: 0.3s;
  opacity: 0;

  .label {
    display: block;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .answer {
    display: block;
    color: ${({ theme }) => theme.colors.error};
    font-size: ${({ theme }) => theme.typography.fontSize.h3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;
