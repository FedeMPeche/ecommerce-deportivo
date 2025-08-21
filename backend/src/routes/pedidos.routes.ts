import { Router } from "express";
import { crearPedido } from "../controllers/pedidos.controller";
import { verifyToken, requireUser } from "../middlewares/auth.middleware";

const router = Router();

// Crear un pedido (requiere usuario autenticado con rol "user")
router.post("/", verifyToken, requireUser, crearPedido);

export default router;
