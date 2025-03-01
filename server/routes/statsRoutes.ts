import { Router } from "express";
import {
  createGameStatsController,
  getGameStatsController,
  updateGameStatsController,
} from "../controllers/gameStatsController";

const router = Router();

router.post("/", createGameStatsController);
router.get("/:userId", getGameStatsController);
router.patch("/:userId", updateGameStatsController);

export default router;
