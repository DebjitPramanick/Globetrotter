import styled, { css } from "styled-components";

type ButtonSize = "small" | "medium" | "large";

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case "small":
      return css`
        padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xs}`};
        font-size: ${({ theme }) => theme.typography.fontSize.small};
      `;
    case "large":
      return css`
        padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md}`};
        font-size: ${({ theme }) => theme.typography.fontSize.h3};
      `;
    default:
      return css`
        padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.sm}`};
        font-size: ${({ theme }) => theme.typography.fontSize.body};
      `;
  }
};

export const StyledButton = styled.button<{
  size: ButtonSize;
  fullWidth?: boolean;
}>`
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  ${({ size }) => getSizeStyles(size)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => `${theme.colors.primary}40`};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
