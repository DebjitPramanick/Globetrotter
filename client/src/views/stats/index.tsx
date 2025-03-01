import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { Container, Title } from "./index.styled";
import StatsOverview from "./components/StatsOverview";
import PerformanceChart from "./components/PerformanceChart";
import { useApp } from "@/context/AppContext";
import { statsApi } from "@/api";
import { Stats as StatsType } from "@/types";
import { useRequestState } from "@/hooks";
import { RequestError } from "@/types/error";
import { ShimmerLoader } from "@/components/atoms";

const StatsPageView = () => {
  const { user } = useApp();
  const [stats, setStats] = useState<StatsType | null>(null);
  const [statsRequestStates, statsRequestStatesHandler] = useRequestState();

  const fetchStats = async () => {
    try {
      statsRequestStatesHandler.pending();
      const response = await statsApi.getUserStats({
        userId: user._id,
      });
      setStats(response.data);
      statsRequestStatesHandler.fulfilled(response.data);
    } catch (error) {
      statsRequestStatesHandler.rejected(new RequestError(error));
    }
  };

  useEffect(() => {
    if (user._id) {
      fetchStats();
    }
  }, [user._id]);

  if (statsRequestStates.isPending) {
    return (
      <AppLayout>
        <Container>
          <ShimmerLoader height="400px" />
        </Container>
      </AppLayout>
    );
  }

  if (!stats) return null;

  return (
    <AppLayout>
      <Container>
        <Title>Game Statistics</Title>
        <StatsOverview
          totalCorrect={stats.totalCorrectAnswers}
          totalWrong={stats.totalWrongAnswers}
          bestScore={stats.bestScore}
          totalCorrectAnswersWithSingleClue={stats.nCorrectAnswersOnFirstClue}
        />
        <PerformanceChart
          totalCorrectAnswersWithFirstClue={stats.nCorrectAnswersOnFirstClue}
          totalWrongAnswersWithFirstClue={stats.nWrongAnswersOnFirstClue}
          totalCorrectAnswersWithMultipleClues={
            stats.nCorrectAnswersOnMultipleClues
          }
          totalWrongAnswersWithMultipleClues={
            stats.nWrongAnswersOnMultipleClues
          }
        />
      </Container>
    </AppLayout>
  );
};

export default StatsPageView;
