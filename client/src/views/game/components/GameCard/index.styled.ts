import styled, { keyframes, css } from "styled-components";
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

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 8px 32px 0 ${({ theme }) => `${theme.colors.primary}10`};
  border: 1px solid ${({ theme }) => `${theme.colors.border}`};
  animation: ${fadeIn} 0.5s ease-out;
  max-width: 1200px;
  height: calc(100vh - 126px);
  height: calc(100dvh - 126px);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  z-index: 1;

  ${mediaQueryMobileOrTablet} {
    height: auto;
    padding: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.xs};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const CluesSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  height: 100%;

  ${mediaQueryMobileOrTablet} {
    gap: 0;
  }
`;

export const CluesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  ${mediaQueryMobileOrTablet} {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const AnswerSection = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-left: ${({ theme }) => theme.spacing.xl};
  border-left: 1px solid ${({ theme }) => theme.colors.border};

  ${mediaQueryMobileOrTablet} {
    width: 100%;
    padding-left: 0;
    gap: 0;
    padding-top: ${({ theme }) => theme.spacing.md};
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const CluesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  overflow-y: auto;
  height: calc(100% - 48px);

  ${mediaQueryMobileOrTablet} {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: ${({ theme }) => theme.spacing.md};
    height: auto;
  }
`;

export const ClueBox = styled.div<{ isRevealed: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme, isRevealed }) =>
    isRevealed ? theme.colors.surface : `${theme.colors.surface}80`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  position: relative;

  ${({ isRevealed }) =>
    !isRevealed &&
    css`
      filter: blur(4px);
      user-select: none;
      cursor: default;
      min-height: 80px;
    `}

  &:first-child {
    animation: ${float} 3s ease-in-out infinite;
  }

  ${mediaQueryMobileOrTablet} {
    display: flex;
    align-items: center;
    min-width: 100%;
    min-height: 176px;

    &:first-child {
      animation: none;
    }
  }
`;

export const RevealButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    background: ${({ theme }) => `${theme.colors.primary}10`};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
    transform: none;
    background: none;
  }
`;

export const ClueNumber = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const ClueText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  position: relative;

  &::before {
    content: '"';
    font-size: 4em;
    color: ${({ theme }) => `${theme.colors.primary}20`};
    position: absolute;
    top: -50px;
    left: -20px;
  }

  &::after {
    content: '"';
    font-size: 4em;
    color: ${({ theme }) => `${theme.colors.primary}20`};
    position: absolute;
    bottom: -90px;
    right: -20px;
  }
`;

export const AnswerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

export const ScoresContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  ${mediaQueryMobileOrTablet} {
    padding: ${({ theme }) => theme.spacing.xs} 0;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

export const StatsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const StatPill = styled.div<{ $type?: "correct" | "wrong" | "total" }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.small};

  ${({ theme, $type }) => {
    switch ($type) {
      case "correct":
        return css`
          background: ${theme.colors.success}15;
          color: ${theme.colors.success};
          border: 1px solid ${theme.colors.success}30;
        `;
      case "wrong":
        return css`
          background: ${theme.colors.error}15;
          color: ${theme.colors.error};
          border: 1px solid ${theme.colors.error}30;
        `;
      default:
        return css`
          background: ${theme.colors.primary}15;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary}30;
        `;
    }
  }}

  ${mediaQueryMobileOrTablet} {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.typography.fontSize.small};
  }
`;

export const StatLabel = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  opacity: 0.8;

  ${mediaQueryMobileOrTablet} {
    display: none;
  }
`;

export const StatValue = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const GameContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  height: calc(100% - 100px);

  ${mediaQueryMobileOrTablet} {
    flex-direction: column;
    gap: 0;
  }
`;

export const ScoreDisplay = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ScoreNumber = styled.span<{ isDecreasing: boolean }>`
  transition: all 0.3s ease;
  transform: ${({ isDecreasing }) =>
    isDecreasing ? "scale(1.2)" : "scale(1)"};
  color: ${({ theme, isDecreasing }) =>
    isDecreasing ? theme.colors.error : theme.colors.primary};
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  height: calc(100% - 65px);
  overflow-y: auto;
`;

export const OptionButton = styled(Button)<{ isSelected?: boolean }>`
  text-align: left;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  background: ${({ theme, isSelected }) =>
    isSelected ? `${theme.colors.primary}10` : theme.colors.surface};
  border: 1px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.colors.primary : theme.colors.border};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}10`};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const ConfirmSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const GameCardContainer = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

export const Score = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  left: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const BackButton = styled.button`
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;
