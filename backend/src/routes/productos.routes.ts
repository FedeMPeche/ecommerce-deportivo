import express from "express";
import prisma from '../prismaClient';

const router = express.Router();

// Obtener producto por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await prisma.producto.findUnique({
  where: { id: Number(req.params.id) },
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
