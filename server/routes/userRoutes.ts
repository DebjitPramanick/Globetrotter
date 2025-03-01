import { Router } from "express";
import {
  createUserController,
  getUserController,
  createOrGetUserController,
} from "../controllers/userController";

const router = Router();

router.post("/", createUserController);
router.get("/:username", getUserController);
router.post("/auth", createOrGetUserController);

export default router;
