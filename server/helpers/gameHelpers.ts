import { Game, GameStats, Destination } from "../models";
import { IGame, IGameStats, IDestination } from "../types";
import mongoose from "mongoose";
import { ERROR_MESSAGES } from "../constants/errors";
import { MAX_SCORE_PER_QUESTION, TOTAL_DESTINATIONS } from "../constants/game";

// Game Helpers
export const createGameHelper = async (userId: string): Promise<IGame> => {
  try {
    const game = new Game({
      userId,
      correctAnswers: 0,
      wrongAnswers: 0,
      score: 0,
      maxScorePerDestination: MAX_SCORE_PER_QUESTION,
    });

    return await game.save();
  } catch (error) {
    throw error;
  }
};

export const getGameHelper = async (id: string): Promise<IGame | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(ERROR_MESSAGES.SERVER.INVALID_ID);
  }
  return await Game.findById(id).populate("destinationIds", "_id city clues");
};

export const updateGameHelper = async (
  id: string,
  updateData: Partial<IGame>
): Promise<IGame | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(ERROR_MESSAGES.SERVER.INVALID_ID);
  }
  return await Game.findByIdAndUpdate(id, updateData, { new: true });
};

// GameStats Helpers
export const createGameStatsHelper = async (
  statsData: Partial<IGameStats>
): Promise<IGameStats> => {
  const stats = new GameStats(statsData);
  return await stats.save();
};

export const submitAnswerHelper = async (
  gameId: string,
  destinationId: string,
  answer: string,
  cluesUsed: number
) => {
  if (
    !mongoose.Types.ObjectId.isValid(gameId) ||
    !mongoose.Types.ObjectId.isValid(destinationId)
  ) {
    throw new Error(ERROR_MESSAGES.SERVER.INVALID_ID);
  }

  const game = await Game.findById(gameId);
  if (!game) {
    throw new Error(ERROR_MESSAGES.GAME.NOT_FOUND);
  }

  const destination = await Destination.findById(destinationId);
  if (!destination) {
    throw new Error(ERROR_MESSAGES.DESTINATION.NOT_FOUND);
  }

  const isCorrect = destination.city.toLowerCase() === answer.toLowerCase();
  const randomFunFact =
    destination.funFact[Math.floor(Math.random() * destination.funFact.length)];

  // Calculate score based on clues used
  const score = calculateScore({
    isCorrect,
    cluesUsed,
    destination,
  });

  // Update game stats and destinationIds if answer is correct
  const updateData: any = {
    $inc: {
      ...(isCorrect ? { correctAnswers: 1, score } : { wrongAnswers: 1 }),
    },
  };

  // Add destination to destinationIds if correct
  if (isCorrect) {
    updateData["$push"] = { destinationIds: destinationId };
  }

  const updatedGame = await Game.findByIdAndUpdate(gameId, updateData, {
    new: true,
  });

  // Update user stats if answer is correct
  updateGameStats({ game, isCorrect, score, cluesUsed });

  return {
    isCorrect,
    cluesUsed,
    score: isCorrect ? score : 0,
    totalScore: updatedGame?.score,
    correctAnswer: isCorrect ? undefined : destination.city,
    isGameCompleted: updatedGame?.destinationIds.length === TOTAL_DESTINATIONS,
    correctAnswers: updatedGame?.correctAnswers,
    wrongAnswers: updatedGame?.wrongAnswers,
    funFact: randomFunFact,
  };
};

const calculateScore = ({
  isCorrect,
  cluesUsed,
  destination,
}: {
  isCorrect: boolean;
  cluesUsed: number;
  destination: IDestination;
}) => {
  const baseScore = MAX_SCORE_PER_QUESTION;
  const scoreDeduction = Math.round(baseScore / destination.clues.length);
  const score = isCorrect
    ? Math.max(baseScore - (cluesUsed - 1) * scoreDeduction, 0)
    : 0;

  return score;
};

const updateGameStats = async ({
  game,
  isCorrect,
  score,
  cluesUsed,
}: {
  game: IGame;
  isCorrect: boolean;
  score: number;
  cluesUsed: number;
}) => {
  const updateData = {
    $max: { bestScore: score },
    $inc: {
      totalCorrectAnswers: 0,
      totalWrongAnswers: 0,
      nCorrectAnswersOnFirstClue: isCorrect ? 1 : 0,
      nWrongAnswersOnFirstClue: isCorrect ? 0 : 1,
      nCorrectAnswersOnMultipleClues: isCorrect ? 1 : 0,
      nWrongAnswersOnMultipleClues: isCorrect ? 0 : 1,
    },
  };

  if (isCorrect) {
    updateData["$inc"]["totalCorrectAnswers"] = 1;
    if (cluesUsed === 1) {
      updateData["$inc"]["nCorrectAnswersOnFirstClue"] = 1;
    } else {
      updateData["$inc"]["nCorrectAnswersOnMultipleClues"] = 1;
    }
  } else {
    updateData["$inc"]["totalWrongAnswers"] = 1;
    if (cluesUsed === 1) {
      updateData["$inc"]["nWrongAnswersOnFirstClue"] = 1;
    } else {
      updateData["$inc"]["nWrongAnswersOnMultipleClues"] = 1;
    }
  }

  await GameStats.findOneAndUpdate({ userId: game.userId }, updateData, {
    upsert: true,
  });
};
