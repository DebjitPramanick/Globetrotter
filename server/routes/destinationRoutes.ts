import { Router } from "express";
import {
  createDestinationController,
  getDestinationController,
  getDestinationListController,
  getDestinationOptionsController,
  getNextClueController,
  bulkCreateDestinationsController,
} from "../controllers/destinationController";

const router = Router();

router.post("/", createDestinationController);
router.post("/bulk", bulkCreateDestinationsController);
router.get("/list", getDestinationListController);
router.get("/:id", getDestinationController);
router.get("/:id/options", getDestinationOptionsController);
router.get("/:id/clue", getNextClueController);

export default router;
