import { Router, Request, Response } from "express";
import {
  createUserController,
  getUserController,
} from "../controllers/userController";

const router = Router();

router.post("/", createUserController);
router.get("/:username", getUserController);

export default router;
