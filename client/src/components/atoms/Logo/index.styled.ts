import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 ${({ theme }) => `${theme.colors.primary}40`};
  }
  70% {
    box-shadow: 0 0 0 15px ${({ theme }) => `${theme.colors.primary}00`};
  }
  100% {
    box-shadow: 0 0 0 0 ${({ theme }) => `${theme.colors.primary}00`};
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  animation: ${float} 3s ease-in-out infinite;
`;

export const LogoIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;

  &:hover {
    transform: scale(1.1) rotate(10deg);
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.accent}
    );

    &::before {
      transform: scale(1.2);
      text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary};
    }
  }

  &:active {
    transform: scale(0.95);
  }

  &::before {
    content: "G";
    color: white;
    font-size: 32px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    transition: all 0.3s ease;
    text-shadow: 2px 2px 0 ${({ theme }) => `${theme.colors.accent}80`};
  }
`;

export const GlowEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    ${({ theme }) => `${theme.colors.primary}40`} 0%,
    transparent 70%
  );
  filter: blur(15px);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${LogoIcon}:hover & {
    opacity: 1;
  }
`;
