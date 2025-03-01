import { Request, Response } from "express";
import { createUserHelper, getUserHelper } from "../helpers/userHelpers";
import { ERROR_MESSAGES } from "../constants/errors";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: ERROR_MESSAGES.USER.REQUIRED });
    }

    const user = await createUserHelper(username);
    res.status(201).json(user);
  } catch (error: any) {
    if (error.message === ERROR_MESSAGES.USER.ALREADY_EXISTS) {
      return res.status(409).json({ error: error.message });
    }
    if (error.message === ERROR_MESSAGES.USER.INVALID_USERNAME) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await getUserHelper(username);

    if (!user) {
      return res.status(404).json({ error: ERROR_MESSAGES.USER.NOT_FOUND });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};
