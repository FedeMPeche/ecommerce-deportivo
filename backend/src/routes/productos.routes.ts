import express from "express";
import prisma from "../prismaClient"; // Asegurate que la ruta sea correcta

const router = express.Router();

// Obtener producto por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await prisma.Producto.findUnique({
      where: { id: Number(id) }
    });

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

export default router;
