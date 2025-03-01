import { Router } from "express";
import {
  createUserController,
  getUserController,
  createOrGetUserController,
} from "../controllers/userController";

const router = Router();

router.post("/", createUserController);
router.get("/:id", getUserController);
router.post("/auth", createOrGetUserController);

export default router;
