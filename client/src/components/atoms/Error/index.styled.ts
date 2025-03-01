import styled from "styled-components";
import { Button } from "@/components/atoms";

export const ErrorContainer = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  text-align: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const ErrorIcon = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const RetryButton = styled(Button)`
  min-width: 120px;
`;
