export const ERROR_MESSAGES = {
  USER: {
    NOT_FOUND: "User not found",
    ALREADY_EXISTS: "Username already exists",
    INVALID_USERNAME: "Username must be between 3 and 20 characters",
    REQUIRED: "Username is required",
  },
  DESTINATION: {
    NOT_FOUND: "Destination not found",
    ALREADY_EXISTS: "Destination already exists",
    INVALID_DATA: "Invalid destination data",
  },
  SERVER: {
    INTERNAL: "Internal server error",
    INVALID_ID: "Invalid ID format",
  },
  GAME: {
    NOT_FOUND: "Game not found",
    STATS_NOT_FOUND: "Game stats not found",
    STATS_EXISTS: "Game stats already exist for this user",
    INVALID_DATA: "Invalid game data",
    NO_MORE_CLUES: "No more clues available",
    ANSWER_REQUIRED: "Answer is required",
  },
};
