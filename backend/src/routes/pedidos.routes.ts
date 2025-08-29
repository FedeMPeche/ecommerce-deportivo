import { Router } from "express";
import { requireUser } from "../middlewares/requireUser.middleware";
import { requireAdmin } from "../middlewares/auth.middleware";
import {
  crearPedido,
  obtenerMisPedidos,
  obtenerTodosPedidos,
  actualizarPedido
} from "../controllers/pedidos.controller";

const router = Router();

// Usuario crea pedido
router.post("/", requireUser, crearPedido);

// Usuario ve solo sus pedidos
router.get("/mios", requireUser, obtenerMisPedidos);

// Admin ve todos los pedidos
router.get("/", requireUser, requireAdmin, obtenerTodosPedidos);

// Admin actualiza estado de un pedido
router.put("/:id", requireUser, requireAdmin, actualizarPedido);

export default router;

//FIX INPORTS //