import mongoose, { Schema } from "mongoose";
import { IDestination } from "../types";

const destinationSchema = new Schema(
  {
    city: {
      type: String,
      required: [true, "City name is required"],
      unique: true,
      trim: true,
      minlength: [2, "City name must be at least 2 characters long"],
    },
    country: {
      type: String,
      required: [true, "Country name is required"],
      trim: true,
      minlength: [2, "Country name must be at least 2 characters long"],
    },
    clues: {
      type: [String],
      required: [true, "At least one clue is required"],
      validate: [
        (val: string[]) => val.length > 0,
        "Clues array cannot be empty",
      ],
    },
    fun_fact: {
      type: [String],
      required: [true, "At least one fun fact is required"],
      validate: [
        (val: string[]) => val.length > 0,
        "Fun facts array cannot be empty",
      ],
    },
    trivia: {
      type: [String],
      required: [true, "At least one trivia is required"],
      validate: [
        (val: string[]) => val.length > 0,
        "Trivia array cannot be empty",
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

destinationSchema.index({ city: 1, country: 1 });

export default mongoose.model<IDestination>("Destination", destinationSchema);
