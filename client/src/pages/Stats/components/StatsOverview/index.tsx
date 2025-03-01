import { useMemo } from "react";
import { Award, CheckCircle, XCircle, Eye } from "react-feather";
import {
  Container,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
} from "./index.styled";

interface StatsOverviewProps {
  totalCorrect: number;
  totalWrong: number;
  bestScore: number;
  totalCorrectAnswersWithSingleClue: number;
}

const StatsOverview = ({
  totalCorrect,
  totalWrong,
  bestScore,
  totalCorrectAnswersWithSingleClue,
}: StatsOverviewProps) => {
  const accuracy = useMemo(() => {
    const total = totalCorrect + totalWrong;
    return total ? Math.round((totalCorrect / total) * 100) : 0;
  }, [totalCorrect, totalWrong]);

  return (
    <Container>
      <StatCard>
        <StatIcon $type="success">
          <CheckCircle size={24} />
        </StatIcon>
        <StatValue>{totalCorrect}</StatValue>
        <StatLabel>Correct Answers</StatLabel>
      </StatCard>
      <StatCard>
        <StatIcon $type="error">
          <XCircle size={24} />
        </StatIcon>
        <StatValue>{totalWrong}</StatValue>
        <StatLabel>Wrong Answers</StatLabel>
      </StatCard>
      <StatCard>
        <StatIcon $type="primary">
          <Eye size={24} />
        </StatIcon>
        <StatValue>{totalCorrectAnswersWithSingleClue}</StatValue>
        <StatLabel>Correct with Single Clue</StatLabel>
      </StatCard>
      <StatCard>
        <StatIcon $type="secondary">
          <Award size={24} />
        </StatIcon>
        <StatValue>{bestScore}</StatValue>
        <StatLabel>Best Score</StatLabel>
      </StatCard>
    </Container>
  );
};

export default StatsOverview;
