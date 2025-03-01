import { useEffect } from "react";
import { DESTINATIONS } from "@/constants";
import { useRouter } from "next/router";
import { useApp } from "@/context/AppContext";
import { Destination, Game } from "@/types";
import { useImmer } from "use-immer";
import { destinationApi, gameApi } from "@/api";
import { RequestError } from "@/types/error";
import { useRequestState } from "./useRequestState";
interface UseGameReturn {
  currentDestination: (typeof DESTINATIONS)[0];
  currentClueIdx: number;
  currentClues: string[];
  totalClues: number;
  currentScore: number;
  totalScore: number;
  submitAnswer: (answer: string) => void;
  revealNextClue: () => void;
}

interface GameState {
  destinations: Destination[];
  currentClues: string[];
  totalClues: number;
  currentDestinationIdx: number;
  currentClueIdx: number;
  totalScore: number;
  currentScore: number;
}

const MAX_SCORE_PER_QUESTION = 100;
const SCORE_DEDUCTION = 25;

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
    currentScore: MAX_SCORE_PER_QUESTION,
    totalScore: 0,
  });

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
        id: state.destinations[state.currentDestinationIdx].id,
        currentClueIndex: state.currentClueIdx,
      };
      fetchNextClueRequestStatesHandler.pending();
      const response = await destinationApi.getNextClue({
        payload,
      });

      const { totalClues }: { totalClues: number } = response.data;

      fetchNextClueRequestStatesHandler.fulfilled(response.data);

      if (state.currentClueIdx < totalClues - 1) {
        setState((draft) => {
          draft.currentClueIdx = draft.currentClueIdx + 1;
          draft.currentScore = Math.max(
            0,
            draft.currentScore - SCORE_DEDUCTION
          );
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
        gameId: game.id,
        destinationId: currentDestination.id,
        answer,
      };
      console.log(game);
      submitAnswerRequestStatesHandler.pending();
      const response = await gameApi.submitAnswer({
        payload,
      });
      submitAnswerRequestStatesHandler.fulfilled(response.data);

      setState((draft) => {
        draft.totalScore = draft.totalScore + draft.currentScore;
        draft.currentClueIdx = 0;
        draft.currentScore = MAX_SCORE_PER_QUESTION;
        draft.currentClues = [];

        if (draft.currentDestinationIdx < DESTINATIONS.length - 1) {
          draft.currentDestinationIdx = draft.currentDestinationIdx + 1;
        }
      });
    } catch (error) {
      submitAnswerRequestStatesHandler.rejected(new RequestError(error));
    }
  };

  useEffect(() => {
    if (!username) {
      router.push("/");
    }
  }, [username]);

  useEffect(() => {
    fetchDestinations();
  }, []);

  return {
    currentDestination: DESTINATIONS[state.currentDestinationIdx],
    currentClueIdx: state.currentClueIdx,
    currentClues: state.currentClues,
    totalClues: state.totalClues,
    totalScore: state.totalScore,
    currentScore: state.currentScore,
    submitAnswer: handleSubmitAnswer,
    revealNextClue: fetchNextClue,
  };
};
