import AppLayout from "@/layouts/AppLayout";
import { Container, Title } from "./index.styled";
import StatsOverview from "./components/StatsOverview";
import PerformanceChart from "./components/PerformanceChart";

const Stats = () => {
  return (
    <AppLayout>
      <Container>
        <Title>Game Statistics</Title>
        <StatsOverview
          totalCorrect={13}
          totalWrong={7}
          bestScore={450}
          correctFirstTry={8}
        />
        <PerformanceChart />
      </Container>
    </AppLayout>
  );
};

export default Stats;
