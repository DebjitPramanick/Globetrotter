import { Destination } from "../models";
import { IDestination, ObjectId } from "../types";
import { ERROR_MESSAGES } from "../constants/errors";
import mongoose from "mongoose";

export const createDestinationHelper = async (
  destinationData: Partial<IDestination>
): Promise<IDestination> => {
  try {
    const existingDestination = await Destination.findOne({
      city: destinationData.city,
    });

    if (existingDestination) {
      throw new Error(ERROR_MESSAGES.DESTINATION.ALREADY_EXISTS);
    }

    const destination = new Destination(destinationData);
    return await destination.save();
  } catch (error) {
    throw error;
  }
};

export const getDestinationHelper = async (
  id: string
): Promise<IDestination | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(ERROR_MESSAGES.SERVER.INVALID_ID);
    }
    return await Destination.findById(id);
  } catch (error) {
    throw error;
  }
};

export const getDestinationListHelper = async () => {
  try {
    const destinations = await Destination.aggregate([
      {
        $project: {
          _id: 1,
          firstClue: { $arrayElemAt: ["$clues", 0] },
          totalClues: { $size: "$clues" },
        },
      },
    ]);

    // Get all destination names for options
    const allDestinationNames = destinations.map((dest) => dest.name);

    return Promise.all(
      destinations.map(async (dest) => {
        // Get 3 random destination names excluding current destination
        const otherDestinations = allDestinationNames.filter(
          (name) => name !== dest.name
        );
        const randomOptions = otherDestinations
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        // Add correct answer at random position
        const position = Math.floor(Math.random() * 4);
        const options = [...randomOptions];
        options.splice(position, 0, dest.name);

        return {
          _id: dest._id,
          name: dest.name,
          clues: [dest.firstClue],
          totalClues: dest.totalClues,
          options,
        };
      })
    );
  } catch (error) {
    throw error;
  }
};

export const bulkCreateDestinationsHelper = async (
  destinationsData: Partial<IDestination>[]
): Promise<IDestination[]> => {
  try {
    // Extract all cities for duplicate check
    const cities = destinationsData.map((dest) => dest.city);

    // Check for existing cities
    const existingDestinations = await Destination.find({
      city: { $in: cities },
    });

    if (existingDestinations.length > 0) {
      const existingCities = existingDestinations
        .map((dest) => dest.city)
        .join(", ");
      throw new Error(`Cities already exist: ${existingCities}`);
    }

    // Validate all destinations before inserting
    const destinationsToCreate = destinationsData.map(
      (dest) => new Destination(dest)
    );
    await Promise.all(destinationsToCreate.map((dest) => dest.validate()));

    // Create and save all destinations
    const createdDestinations = await Promise.all(
      destinationsToCreate.map((dest) => dest.save())
    );
    return createdDestinations;
  } catch (error) {
    throw error;
  }
};

export const getDestinationOptionsHelper = async (destinationId: string) => {
  if (!mongoose.Types.ObjectId.isValid(destinationId)) {
    throw new Error(ERROR_MESSAGES.SERVER.INVALID_ID);
  }

  const currentDestination = await Destination.findById(destinationId);
  if (!currentDestination) {
    throw new Error(ERROR_MESSAGES.DESTINATION.NOT_FOUND);
  }

  const otherOptions = await Destination.aggregate([
    { $match: { _id: { $ne: new mongoose.Types.ObjectId(destinationId) } } },
    { $sample: { size: 3 } },
    { $project: { city: 1 } },
  ]);

  const options = [{ city: currentDestination.city }, ...otherOptions].sort(
    () => Math.random() - 0.5
  );

  return options;
};

export const getNextClueHelper = async (
  destinationId: string,
  currentClueIndex: number
): Promise<{ clue: string; totalClues: number } | null> => {
  if (!mongoose.Types.ObjectId.isValid(destinationId)) {
    throw new Error(ERROR_MESSAGES.SERVER.INVALID_ID);
  }

  const destination = await Destination.findById(destinationId);
  if (!destination) {
    throw new Error(ERROR_MESSAGES.DESTINATION.NOT_FOUND);
  }

  if (currentClueIndex >= destination.clues.length) {
    return null;
  }

  return {
    clue: destination.clues[currentClueIndex],
    totalClues: destination.clues.length,
  };
};
