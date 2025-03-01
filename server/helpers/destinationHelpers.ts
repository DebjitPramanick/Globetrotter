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
    return await Destination.find({}, "_id city clues");
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
