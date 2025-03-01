import styled from "styled-components";

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
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const InstructionItem = styled.li`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.9;
  text-align: center;
  width: 100%;
`;
