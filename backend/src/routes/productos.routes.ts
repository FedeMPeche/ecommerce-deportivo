import { Router } from "express";
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} from "../controllers/productos.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

// Rutas públicas
router.get("/", getProductos);          // Lista todos los productos
router.get("/:id", getProductoById);    // Trae un producto por ID

// Rutas protegidas (solo admin)
router.post("/", verifyToken, createProducto);      // Crear producto
router.put("/:id", verifyToken, updateProducto);    // Actualizar producto
router.delete("/:id", verifyToken, deleteProducto); // Eliminar producto

export default router;

