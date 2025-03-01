import styled, { css, keyframes } from "styled-components";

const shimmer = keyframes`
  from {
    background-position-x: 100%;
  }
  to {
    background-position-x: -30%;
  }
`;

export const ShimmerContainer = styled.div`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.shimmer.base};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

export const ShimmerEffect = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => css`
    background-color: ${theme.colors.shimmer.base};
    background: linear-gradient(
      -30deg,
      ${theme.colors.shimmer.base} 40%,
      ${theme.colors.shimmer.highlight} 50%,
      ${theme.colors.shimmer.base} 60%
    );
  `}
  background-size: 300%;
  animation: ${shimmer} 2s linear infinite;
`;
