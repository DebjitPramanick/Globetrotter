import mongoose, { Schema } from "mongoose";
import { IGame } from "../types";

const gameSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    correctAnswers: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    wrongAnswers: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    destinationIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Destination",
        required: true,
      },
    ],
    clueIndices: {
      type: Object,
      default: {},
    },
    score: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    maxScorePerDestination: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// Index for faster queries
gameSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<IGame>("Game", gameSchema);
