import mongoose, { Schema } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
