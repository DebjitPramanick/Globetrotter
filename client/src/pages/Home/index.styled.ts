import styled from "styled-components";

export const HomeContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  color: ${({ theme }) => theme.colors.text};
`;
