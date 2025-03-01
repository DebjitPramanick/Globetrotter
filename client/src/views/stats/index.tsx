import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import {
  Container,
  Title,
  ErrorContainer,
  ErrorMessage,
  RetryButton,
} from "./index.styled";
import StatsOverview from "./components/StatsOverview";
import PerformanceChart from "./components/PerformanceChart";
import { useApp } from "@/context/AppContext";
import { statsApi } from "@/api";
import { Stats as StatsType } from "@/types";
import { useRequestState } from "@/hooks";
import { RequestError } from "@/types/error";
import { ShimmerLoader } from "@/components/atoms";
import { AlertCircle } from "react-feather";

const StatsPageView = () => {
  const { user } = useApp();
  const [statsRequestStates, statsRequestStatesHandler] = useRequestState();

  const fetchStats = async () => {
    try {
      statsRequestStatesHandler.pending();
      const response = await statsApi.getUserStats({
        userId: user._id,
      });
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

  let nodeToRender = null;

  if (statsRequestStates.isPending) {
    nodeToRender = <ShimmerLoader height="400px" />;
  } else if (statsRequestStates.isRejected) {
    nodeToRender = (
      <ErrorContainer>
        <AlertCircle size={48} />
        <ErrorMessage>
          Oops! We couldn't load your stats right now.
          <span>Please try again later.</span>
        </ErrorMessage>
        <RetryButton onClick={fetchStats}>Try Again</RetryButton>
      </ErrorContainer>
    );
  } else if (statsRequestStates.isFulfilled) {
    const stats = statsRequestStates.data;
    nodeToRender = (
      <>
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
      </>
    );
  }

  return (
    <AppLayout>
      <Container>{nodeToRender}</Container>
    </AppLayout>
  );
};

export default StatsPageView;
