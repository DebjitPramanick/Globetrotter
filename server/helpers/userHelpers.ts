import User from "../models/User";
import { ERROR_MESSAGES } from "../constants/errors";
import { IUser } from "../types";

export const createUserHelper = async (username: string): Promise<IUser> => {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error(ERROR_MESSAGES.USER.ALREADY_EXISTS);
    }

    if (!username || username.length < 3 || username.length > 20) {
      throw new Error(ERROR_MESSAGES.USER.INVALID_USERNAME);
    }

    const user = new User({ username });
    return await user.save();
  } catch (error) {
    throw error;
  }
};

export const getUserHelper = async (
  username: string
): Promise<IUser | null> => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw error;
  }
};
