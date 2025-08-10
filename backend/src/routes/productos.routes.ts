import express from "express";
import { login, register } from "../controllers/auth.controller";

const router = express.Router();

// Ruta de registro
router.post("/register", register);

// Ruta de login
router.post("/login", login);

export default router;
