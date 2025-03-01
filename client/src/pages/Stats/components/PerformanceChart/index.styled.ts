import styled from "styled-components";

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    box-shadow: 0 8px 32px ${({ theme }) => `${theme.colors.primary}10`};
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ChartContainer = styled.div`
  .recharts-tooltip-cursor {
    fill: ${({ theme }) => `${theme.colors.primary}10`};
  }

  .recharts-default-tooltip {
    background-color: ${({ theme }) => theme.colors.surface} !important;
    border: 1px solid ${({ theme }) => theme.colors.border} !important;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
  }

  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line {
    stroke: ${({ theme }) => theme.colors.border};
  }

  .recharts-text {
    fill: ${({ theme }) => theme.colors.text} !important;
  }

  .recharts-legend-item-text {
    color: ${({ theme }) => theme.colors.text} !important;
  }
`;
