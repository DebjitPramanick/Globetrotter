import styled from "styled-components";

const HomeContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  color: ${({ theme }) => theme.colors.text};
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Welcome Home</Title>
    </HomeContainer>
  );
};

export default Home;
