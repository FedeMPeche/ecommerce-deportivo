import { Request, Response } from "express";
import prisma from "../prismaClient";
import fs from "fs";

export const getProductos = async (req: Request, res: Response) => {
  try {
    const productos = await prisma.producto.findMany();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

export const getProductoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const producto = await prisma.producto.findUnique({
      where: { id: Number(id) },
    });

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ error: "Error al obtener producto" });
  }
};

export const createProducto = async (req: Request, res: Response) => {
  const { nombre, descripcion, precio, stock, categoria } = req.body;
  const imagenUrl = req.file
    ? `/uploads/${req.file.filename}`
    : "/uploads/placeholder.png"; // 👈 Placeholder si no hay imagen

  try {
    const producto = await prisma.producto.create({
      data: {
        nombre,
        descripcion,
        precio: Number(precio),
        stock: Number(stock),
        imagenUrl,
      },
    });

    res.status(201).json(producto);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

export const updateProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, categoria } = req.body;

  let imagenUrl: string | undefined;
  if (req.file) {
    imagenUrl = `/uploads/${req.file.filename}`;
  }

  try {
    const producto = await prisma.producto.update({
      where: { id: Number(id) },
      data: {
        nombre,
        descripcion,
        precio: Number(precio),
        stock: Number(stock),
        ...(imagenUrl ? { imagenUrl } : {}), // 👈 si no hay nueva img, no pisa la anterior
      },
    });

    res.json(producto);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const producto = await prisma.producto.findUnique({ where: { id } });
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

    // Borrar imagen asociada si existe
    if (producto.imagenUrl) {
      const imagePath = `.${producto.imagenUrl}`;
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error al borrar imagen:", err);
      });
    }

    await prisma.producto.delete({ where: { id } });

    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};
