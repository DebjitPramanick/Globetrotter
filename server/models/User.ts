import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
  },
  { timestamps: true }
);

// Case-insensitive unique index on username
userSchema.index(
  { username: 1 },
  {
    unique: true,
    collation: { locale: "en", strength: 2 },
  }
);

export default mongoose.model<IUser>("User", userSchema);
