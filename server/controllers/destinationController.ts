import { Request, Response } from "express";
import {
  createDestinationHelper,
  getDestinationHelper,
  getDestinationListHelper,
  bulkCreateDestinationsHelper,
  getDestinationOptionsHelper,
  getNextClueHelper,
} from "../helpers/destinationHelpers";
import { ERROR_MESSAGES } from "../constants/errors";

export const createDestinationController = async (
  req: Request,
  res: Response
) => {
  try {
    const destination = await createDestinationHelper(req.body);
    res.status(201).json(destination);
  } catch (error: any) {
    if (error.message === ERROR_MESSAGES.DESTINATION.ALREADY_EXISTS) {
      return res.status(409).json({ error: error.message });
    }
    if (error.message.includes("validation failed")) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};

export const getDestinationController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    try {
      const destination = await getDestinationHelper(id);
      if (!destination) {
        return res
          .status(404)
          .json({ error: ERROR_MESSAGES.DESTINATION.NOT_FOUND });
      }
      res.status(200).json(destination);
    } catch (error: any) {
      if (error.message === ERROR_MESSAGES.SERVER.INVALID_ID) {
        return res.status(400).json({ error: error.message });
      }
      throw error;
    }
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};

export const getDestinationListController = async (
  req: Request,
  res: Response
) => {
  try {
    const destinations = await getDestinationListHelper();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};

export const bulkCreateDestinationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const destinations = req.body;

    if (!Array.isArray(destinations) || destinations.length === 0) {
      return res.status(400).json({
        error: "Request body should be a non-empty array of destinations",
      });
    }

    const createdDestinations = await bulkCreateDestinationsHelper(
      destinations
    );
    res.status(201).json(createdDestinations);
  } catch (error: any) {
    console.log(error);
    if (error.message.includes("Cities already exist")) {
      return res.status(409).json({ error: error.message });
    }
    if (error.message.includes("validation failed")) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};

export const getDestinationOptionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const options = await getDestinationOptionsHelper(id);
    res.status(200).json(options);
  } catch (error: any) {
    if (error.message === ERROR_MESSAGES.SERVER.INVALID_ID) {
      return res.status(400).json({ error: error.message });
    }
    if (error.message === ERROR_MESSAGES.DESTINATION.NOT_FOUND) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};

export const getNextClueController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { currentClueIndex = 0 } = req.query;
    const clue = await getNextClueHelper(id, Number(currentClueIndex));
    if (!clue) {
      return res.status(404).json({ error: ERROR_MESSAGES.GAME.NO_MORE_CLUES });
    }
    res.status(200).json({ clue });
  } catch (error: any) {
    if (error.message === ERROR_MESSAGES.SERVER.INVALID_ID) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: ERROR_MESSAGES.SERVER.INTERNAL });
  }
};
