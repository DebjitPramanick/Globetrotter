import styled, { keyframes } from "styled-components";

const float = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

export const FloatingElementsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

type ShapeType = "circle" | "square" | "triangle";

export const FloatingElement = styled.div<{
  size: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  shape: ShapeType;
  color: string;
}>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  background: ${({ color, theme }) =>
    theme.colors[color as keyof typeof theme.colors]
      ? `${theme.colors[color as keyof typeof theme.colors]}20`
      : `${theme.colors.primary}20`};
  ${({ shape }) => getShapeStyles(shape)};
  animation: ${float} ${({ duration }) => duration}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    ${({ shape }) => getShapeStyles(shape)};
    border: 2px solid
      ${({ color, theme }) =>
        theme.colors[color as keyof typeof theme.colors]
          ? `${theme.colors[color as keyof typeof theme.colors]}40`
          : `${theme.colors.primary}40`};
    animation: ${pulse} 3s ease-in-out infinite;
    animation-delay: ${({ delay }) => delay + 1}s;
  }
`;

const getShapeStyles = (shape: ShapeType) => {
  switch (shape) {
    case "square":
      return `
        border-radius: 10px;
        transform: rotate(45deg);
      `;
    case "triangle":
      return `
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      `;
    default:
      return `
        border-radius: 50%;
      `;
  }
};
