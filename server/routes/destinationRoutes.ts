import { Router } from "express";
import {
  createDestinationController,
  getDestinationController,
  getDestinationListController,
  bulkCreateDestinationsController,
} from "../controllers/destinationController";

const router = Router();

router.post("/", createDestinationController);
router.post("/bulk", bulkCreateDestinationsController);
router.get("/list", getDestinationListController);
router.get("/:id", getDestinationController);

export default router;
