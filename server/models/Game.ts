import mongoose, { Schema } from "mongoose";
import { IGame } from "../types";

const gameSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
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
  },
  { timestamps: true }
);

// Index for faster queries
gameSchema.index({ username: 1, createdAt: -1 });

export default mongoose.model<IGame>("Game", gameSchema);
