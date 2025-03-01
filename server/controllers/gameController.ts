import { Request, Response } from "express";
import {
  createGameHelper,
  getGameHelper,
  submitAnswerHelper,
} from "../helpers/gameHelpers";
import { ERROR_MESSAGES } from "../constants/errors";

// Game Controllers
export const createGameController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: ERROR_MESSAGES.USER.ID_REQUIRED });
    }
    const game = await createGameHelper(userId);
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
    if (error.message === ERROR_MESSAGES.SERVER.INVALID_ID) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};

export const submitAnswerController = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const { destinationId, answer } = req.body;

    if (!answer) {
      return res
        .status(400)
        .json({ error: ERROR_MESSAGES.GAME.ANSWER_REQUIRED });
    }

    if (!destinationId) {
      return res
        .status(400)
        .json({ error: ERROR_MESSAGES.DESTINATION.ID_REQUIRED });
    }

    const result = await submitAnswerHelper(gameId, destinationId, answer);
    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === ERROR_MESSAGES.SERVER.INVALID_ID) {
      return res.status(400).json({ error: error.message });
    }
    if (error.message === ERROR_MESSAGES.GAME.NOT_FOUND) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};
