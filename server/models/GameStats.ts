import mongoose, { Schema } from "mongoose";
import { IGameStats } from "../types";

const gameStatsSchema = new Schema<IGameStats>(
  {
    userId: {
      type: String,
      required: true,
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
  {
    timestamps: true,
  }
);

// Only keep the userId index
gameStatsSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model<IGameStats>("GameStats", gameStatsSchema);
