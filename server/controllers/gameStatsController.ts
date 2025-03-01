import { Request, Response } from "express";
import {
  createGameStatsHelper,
  getGameStatsHelper,
  updateGameStatsHelper,
} from "../helpers/gameStatsHelpers";
import { ERROR_MESSAGES } from "../constants/errors";

export const createGameStatsController = async (
  req: Request,
  res: Response
) => {
  try {
    const stats = await createGameStatsHelper(req.body);
    res.status(201).json(stats);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ error: ERROR_MESSAGES.GAME.STATS_EXISTS });
    }
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};

export const getGameStatsController = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const stats = await getGameStatsHelper(username);
    if (!stats) {
      return res
        .status(404)
        .json({ error: ERROR_MESSAGES.GAME.STATS_NOT_FOUND });
    }
    res.status(200).json(stats);
  } catch (error: any) {
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};

export const updateGameStatsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { username } = req.params;
    const stats = await updateGameStatsHelper(username, req.body);
    if (!stats) {
      return res
        .status(404)
        .json({ error: ERROR_MESSAGES.GAME.STATS_NOT_FOUND });
    }
    res.status(200).json(stats);
  } catch (error: any) {
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};
