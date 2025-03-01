import { Router } from "express";
import userRoutes from "./userRoutes";
import destinationRoutes from "./destinationRoutes";
import gameRoutes from "./gameRoutes";
import statsRoutes from "./statsRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/destinations", destinationRoutes);
router.use("/games", gameRoutes);
router.use("/stats", statsRoutes);

export default router;
