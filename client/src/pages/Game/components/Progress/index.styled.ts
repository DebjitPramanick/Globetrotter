import styled from "styled-components";

export const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  transition: width 0.3s ease;
`;

export const Score = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
`;
