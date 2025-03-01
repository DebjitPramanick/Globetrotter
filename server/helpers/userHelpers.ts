import User from "../models/User";
import { ERROR_MESSAGES } from "../constants/errors";
import { IUser } from "../types";

export const createUserHelper = async (username: string): Promise<IUser> => {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error(ERROR_MESSAGES.USER.ALREADY_EXISTS);
    }

    if (!username || username.length < 3 || username.length > 30) {
      throw new Error(ERROR_MESSAGES.USER.INVALID_USERNAME);
    }

    const user = new User({ username });
    return await user.save();
  } catch (error) {
    throw error;
  }
};

export const getUserHelper = async (id: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

export const createOrGetUser = async (username: string): Promise<IUser> => {
  try {
    // Try to find existing user
    let user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") }, // Case insensitive search
    });

    // If user doesn't exist, create new one
    if (!user) {
      user = new User({
        username,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await user.save();
    }

    return user;
  } catch (error) {
    console.error("Error in createOrGetUser:", error);
    throw error;
  }
};
