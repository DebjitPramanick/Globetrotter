import { Request, Response } from "express";
import {
  createGameHelper,
  getGameHelper,
  updateGameHelper,
} from "../helpers/gameHelpers";
import { ERROR_MESSAGES } from "../constants/errors";

// Game Controllers
export const createGameController = async (req: Request, res: Response) => {
  try {
    const game = await createGameHelper(req.body);
    res.status(201).json(game);
  } catch (error: any) {
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};

export const getGameController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const game = await getGameHelper(id);
    if (!game) {
      return res.status(404).json({ error: ERROR_MESSAGES.GAME.NOT_FOUND });
    }
    res.status(200).json(game);
  } catch (error: any) {
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};

export const updateGameController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const game = await updateGameHelper(id, req.body);
    if (!game) {
      return res.status(404).json({ error: ERROR_MESSAGES.GAME.NOT_FOUND });
    }
    res.status(200).json(game);
  } catch (error: any) {
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};
