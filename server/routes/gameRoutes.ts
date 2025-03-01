import { Router } from "express";
import {
  createGameController,
  getGameController,
  submitAnswerController,
} from "../controllers/gameController";

const router = Router();

// Game routes
router.post("/start", createGameController);
router.get("/:id", getGameController);
router.post("/:id/answer", submitAnswerController);

export default router;
