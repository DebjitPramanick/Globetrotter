import styled from "styled-components";

export const CreditWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  bottom: ${({ theme }) => theme.spacing.lg};
  /* padding: ${({ theme }) => theme.spacing.sm}; */
  background: ${({ theme }) => `${theme.colors.surface}80`};
  backdrop-filter: blur(8px);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  white-space: nowrap;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    bottom: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.small};
  }
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
