import styled from "styled-components";

const StatsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  color: ${({ theme }) => theme.colors.text};
`;

const Stats = () => {
  return (
    <StatsContainer>
      <Title>Statistics</Title>
    </StatsContainer>
  );
};

export default Stats;
