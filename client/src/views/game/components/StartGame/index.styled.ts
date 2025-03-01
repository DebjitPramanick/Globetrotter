import styled, { keyframes } from "styled-components";

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const BackgroundWrapper = styled.div`
  position: relative;
  height: calc(100vh - 126px);
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  height: calc(100vh - 126px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StartGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.primary};
`;

export const Instructions = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const InstructionItem = styled.li<{ $delay: number }>`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0;
  text-align: left;
  width: 100%;
  animation: ${slideInRight} 0.5s ease-out forwards;
  animation-delay: ${({ $delay }) => `${$delay}s`};
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
`;
