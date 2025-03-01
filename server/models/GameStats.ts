import mongoose, { Schema } from "mongoose";
import { IGameStats } from "../types";

const gameStatsSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    bestScore: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    totalGamesPlayed: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    totalWrongAnswers: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    totalCorrectAnswers: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    nCorrectAnswersOnFirstClue: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    nWrongAnswersOnFirstClue: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    nCorrectAnswersOnMultipleClues: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    nWrongAnswersOnMultipleClues: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// Index for faster lookups
gameStatsSchema.index({ username: 1 });

export default mongoose.model<IGameStats>("GameStats", gameStatsSchema);
