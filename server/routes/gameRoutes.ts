import { Router } from "express";
import {
  createGameController,
  getGameController,
  updateGameController,
} from "../controllers/gameController";

const router = Router();

// Game routes
router.post("/", createGameController);
router.get("/:id", getGameController);
router.patch("/:id", updateGameController);

export default router;
