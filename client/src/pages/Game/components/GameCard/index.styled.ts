import styled, { keyframes, css } from "styled-components";

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
    transform: translateY(-10px);
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
  max-width: 1000px;
  width: 100%;
  height: calc(100vh - 200px);
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
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

export const CluesSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const CluesHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const AnswerSection = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-left: ${({ theme }) => theme.spacing.xl};
  border-left: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    padding-left: 0;
    padding-top: ${({ theme }) => theme.spacing.xl};
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const CluesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
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
    top: -0.3em;
    left: -0.2em;
  }

  &::after {
    content: '"';
    font-size: 4em;
    color: ${({ theme }) => `${theme.colors.primary}20`};
    position: absolute;
    bottom: -0.7em;
    right: -0.2em;
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
`;

export const ScoreDisplay = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TotalScore = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const GameContent = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const ScoreNumber = styled.span<{ isDecreasing: boolean }>`
  transition: all 0.3s ease;
  transform: ${({ isDecreasing }) =>
    isDecreasing ? "scale(1.2)" : "scale(1)"};
  color: ${({ theme, isDecreasing }) =>
    isDecreasing ? theme.colors.error : theme.colors.primary};
`;
