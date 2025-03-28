import { GameStats } from "../models";
import { IGameStats } from "../types";

export const createGameStatsHelper = async (
  statsData: Partial<IGameStats>
): Promise<IGameStats> => {
  const stats = new GameStats(statsData);
  return await stats.save();
};

export const getGameStatsHelper = async (
  userId: string
): Promise<IGameStats | null> => {
  return await GameStats.findOne({ userId });
};

export const updateGameStatsHelper = async (
  username: string,
  updateData: Partial<IGameStats>
): Promise<IGameStats | null> => {
  return await GameStats.findOneAndUpdate({ username }, updateData, {
    new: true,
  });
};
