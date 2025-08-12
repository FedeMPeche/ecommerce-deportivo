import { Router } from "express";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../controllers/productos.controller";
import { verifyJWT, requireAdmin } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.get("/", getProductos);

router.post(
  "/",
  verifyJWT,
  requireAdmin,
  upload.single("imagen"),
  createProducto
);

router.put(
  "/:id",
  verifyJWT,
  requireAdmin,
  upload.single("imagen"),
  updateProducto
);

router.delete("/:id", verifyJWT, requireAdmin, deleteProducto);

export default router;


