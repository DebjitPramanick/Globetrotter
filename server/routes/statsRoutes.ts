import { Router } from "express";
import {
  createGameStatsController,
  getGameStatsController,
  updateGameStatsController,
} from "../controllers/gameStatsController";

const router = Router();

router.post("/", createGameStatsController);
router.get("/:username", getGameStatsController);
router.patch("/:username", updateGameStatsController);

export default router;
