import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useApp } from "@/context/AppContext";
import { Destination, Game } from "@/types";
import { useImmer } from "use-immer";
import { destinationApi, gameApi } from "@/api";
import { RequestError } from "@/types/error";
import { RequestState, useRequestState } from "./useRequestState";
interface UseGameReturn {
  destinationsRequestStates: RequestState<Destination[]>;
  fetchNextClueRequestStates: RequestState<any>;
  submitAnswerRequestStates: RequestState<any>;
  scoreDeduction: number;
  currentDestination: Destination;
  currentClueIdx: number;
  currentClues: string[];
  totalClues: number;
  scoreToObtain: number;
  totalScore: number;
  isSelectedAnswerCorrect: boolean;
  hasSubmittedAnswer: boolean;
  submissionResult: {
    isCorrect: boolean;
    cluesUsed: number;
    score: number;
    totalScore: number;
    correctAnswer: string | undefined;
    isGameCompleted: boolean;
    correctAnswers: number;
    wrongAnswers: number;
    funFact: string;
  };
  submitAnswer: (answer: string) => void;
  revealNextClue: () => void;
  moveToNextDestination: () => void;
}

interface GameState {
  destinations: Destination[];
  currentClues: string[];
  totalClues: number;
  currentDestinationIdx: number;
  currentClueIdx: number;
  totalScore: number;
  scoreToObtain: number;
  isSelectedAnswerCorrect: boolean;
  hasSubmittedAnswer: boolean;
}

export const useGame = ({ game }: { game: Game }): UseGameReturn => {
  const router = useRouter();
  const { username } = useApp();

  const [destinationsRequestStates, destinationsRequestStatesHandler] =
    useRequestState<Destination[]>();
  const [fetchNextClueRequestStates, fetchNextClueRequestStatesHandler] =
    useRequestState<any>(); // TODO: fix type
  const [submitAnswerRequestStates, submitAnswerRequestStatesHandler] =
    useRequestState<any>(); // TODO: fix type

  const [state, setState] = useImmer<GameState>({
    destinations: [],
    currentClues: [],
    totalClues: 0,
    currentDestinationIdx: 0,
    currentClueIdx: 0,
    scoreToObtain: game.maxScorePerDestination,
    totalScore: 0,
    isSelectedAnswerCorrect: false,
    hasSubmittedAnswer: false,
  });

  const scoreDeduction = Math.floor(state.scoreToObtain / state.totalClues);

  const fetchDestinations = async () => {
    try {
      destinationsRequestStatesHandler.pending();
      const response = await destinationApi.getListOfDestinations();
      destinationsRequestStatesHandler.fulfilled(response.data);
      setState((draft) => {
        draft.destinations = response.data;
        const currentDestination = response.data[draft.currentDestinationIdx];
        draft.currentClues = currentDestination.clues;
        draft.totalClues = currentDestination.totalClues;
      });
    } catch (error) {
      destinationsRequestStatesHandler.rejected(new RequestError(error));
    }
  };

  const fetchNextClue = async () => {
    try {
      const payload = {
        id: state.destinations[state.currentDestinationIdx]._id,
        currentClueIndex: state.currentClueIdx + 1,
      };
      fetchNextClueRequestStatesHandler.pending();
      const response = await destinationApi.getNextClue({
        payload,
      });

      const { clue, totalClues }: { clue: string; totalClues: number } =
        response.data;

      fetchNextClueRequestStatesHandler.fulfilled(response.data);

      if (state.currentClueIdx < totalClues - 1) {
        setState((draft) => {
          draft.currentClueIdx = draft.currentClueIdx + 1;
          draft.scoreToObtain = Math.max(
            0,
            draft.scoreToObtain - scoreDeduction
          );
          draft.currentClues = [...draft.currentClues, clue];
        });
      }
    } catch (error) {
      destinationsRequestStatesHandler.rejected(new RequestError(error));
    }
  };

  const handleSubmitAnswer = async (answer: string) => {
    try {
      const currentDestination =
        state.destinations[state.currentDestinationIdx];
      const payload = {
        gameId: game._id,
        destinationId: currentDestination._id,
        answer,
        cluesUsed: state.currentClueIdx + 1,
      };
      submitAnswerRequestStatesHandler.pending();
      const response = await gameApi.submitAnswer({
        payload,
      });
      const { isCorrect, totalScore } = response.data as any; // TODO: fix type
      submitAnswerRequestStatesHandler.fulfilled(response.data);

      setState((draft) => {
        draft.hasSubmittedAnswer = true;
        draft.totalScore = totalScore;
        draft.isSelectedAnswerCorrect = isCorrect;
      });
    } catch (error) {
      submitAnswerRequestStatesHandler.rejected(new RequestError(error));
    }
  };

  const moveToNextDestination = () => {
    setState((draft) => {
      draft.currentClueIdx = 0;
      draft.scoreToObtain = game.maxScorePerDestination;
      draft.hasSubmittedAnswer = false;
      draft.isSelectedAnswerCorrect = false;

      if (draft.currentDestinationIdx < state.destinations.length - 1) {
        draft.currentDestinationIdx = draft.currentDestinationIdx + 1;
        const nextDestination = draft.destinations[draft.currentDestinationIdx];
        draft.currentClues = nextDestination.clues;
        draft.totalClues = nextDestination.totalClues;
      }
    });
  };

  useEffect(() => {
    if (!username) {
      router.push("/");
    }
  }, [username]);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const isLoadingGame = destinationsRequestStates.isPending;

  return {
    destinationsRequestStates,
    fetchNextClueRequestStates,
    submitAnswerRequestStates,
    scoreDeduction,
    currentDestination: state.destinations[state.currentDestinationIdx],
    currentClueIdx: state.currentClueIdx,
    currentClues: state.currentClues,
    totalClues: state.totalClues,
    totalScore: state.totalScore,
    scoreToObtain: state.scoreToObtain,
    isSelectedAnswerCorrect: state.isSelectedAnswerCorrect,
    hasSubmittedAnswer: state.hasSubmittedAnswer,
    submissionResult: submitAnswerRequestStates.data,
    submitAnswer: handleSubmitAnswer,
    revealNextClue: fetchNextClue,
    moveToNextDestination,
  };
};
