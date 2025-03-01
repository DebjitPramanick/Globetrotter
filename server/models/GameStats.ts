import mongoose, { Schema } from "mongoose";
import { IGameStats } from "../types";

const gameStatsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
    },
    bestScore: {
      type: Number,
      default: 0,
    },
    totalCorrectAnswers: {
      type: Number,
      default: 0,
    },
    totalWrongAnswers: {
      type: Number,
      default: 0,
    },
    nCorrectAnswersOnFirstClue: {
      type: Number,
      default: 0,
    },
    nWrongAnswersOnFirstClue: {
      type: Number,
      default: 0,
    },
    nCorrectAnswersOnMultipleClues: {
      type: Number,
      default: 0,
    },
    nWrongAnswersOnMultipleClues: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Index for faster lookups
gameStatsSchema.index({ userId: 1 });

export default mongoose.model<IGameStats>("GameStats", gameStatsSchema);
