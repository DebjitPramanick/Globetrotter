import { Game, GameStats, Destination } from "../models";
import { IGame, IGameStats, IDestination } from "../types";
import mongoose from "mongoose";
import { ERROR_MESSAGES } from "../constants/errors";

// Game Helpers
export const createGameHelper = async (username: string): Promise<IGame> => {
  try {
    // Get random destinations
    const destinations = await Destination.aggregate([
      { $sample: { size: 5 } },
    ]);

    if (!destinations.length) {
      throw new Error(ERROR_MESSAGES.DESTINATION.NOT_FOUND);
    }

    const game = new Game({
      username,
      destinationIds: destinations.map((dest) => dest._id),
      correctAnswers: 0,
      wrongAnswers: 0,
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

export const getDestinationOptionsHelper = async (
  gameId: string,
  destinationId: string
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

  // Get current destination and 3 random ones for options
  const currentDestination = await Destination.findById(destinationId);
  const otherOptions = await Destination.aggregate([
    { $match: { _id: { $ne: new mongoose.Types.ObjectId(destinationId) } } },
    { $sample: { size: 3 } },
    { $project: { city: 1 } },
  ]);

  const options = [{ city: currentDestination?.city }, ...otherOptions].sort(
    () => Math.random() - 0.5
  );

  return options;
};

export const getNextClueHelper = async (
  gameId: string,
  destinationId: string
): Promise<string | null> => {
  if (
    !mongoose.Types.ObjectId.isValid(gameId) ||
    !mongoose.Types.ObjectId.isValid(destinationId)
  ) {
    throw new Error(ERROR_MESSAGES.SERVER.INVALID_ID);
  }

  const destination = await Destination.findById(destinationId);
  if (!destination) {
    throw new Error(ERROR_MESSAGES.DESTINATION.NOT_FOUND);
  }

  const game = await Game.findById(gameId);
  if (!game) {
    throw new Error(ERROR_MESSAGES.GAME.NOT_FOUND);
  }

  // Get next available clue
  const currentClueIndex = game.clueIndices?.[destinationId] || 0;
  if (currentClueIndex >= destination.clues.length) {
    return null;
  }

  // Update clue index
  await Game.findByIdAndUpdate(gameId, {
    [`clueIndices.${destinationId}`]: currentClueIndex + 1,
  });

  return destination.clues[currentClueIndex];
};

export const submitAnswerHelper = async (
  gameId: string,
  destinationId: string,
  answer: string
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
  const cluesUsed = game.clueIndices?.[destinationId] || 1;

  // Update game stats
  const updateData = isCorrect
    ? { $inc: { correctAnswers: 1 } }
    : { $inc: { wrongAnswers: 1 } };

  await Game.findByIdAndUpdate(gameId, updateData);

  return {
    correct: isCorrect,
    cluesUsed,
    correctAnswer: isCorrect ? undefined : destination.city,
  };
};
