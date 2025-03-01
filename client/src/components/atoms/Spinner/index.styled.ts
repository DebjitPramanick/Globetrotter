import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

interface SpinnerCircleProps {
  size: number;
  color?: string;
  thickness: number;
}

export const SpinnerCircle = styled.div<SpinnerCircleProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: ${({ thickness }) => thickness}px solid
    ${({ theme }) => theme.colors.border};
  border-top: ${({ thickness }) => thickness}px solid
    ${({ color, theme }) => color || theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
