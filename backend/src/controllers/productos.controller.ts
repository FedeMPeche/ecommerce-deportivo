import { Request, Response } from "express";
import prisma from "../prismaClient";
import fs from "fs";

export const getProductos = async (req: Request, res: Response) => {
  try {
    const productos = await prisma.producto.findMany();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

export const createProducto = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    let imagenUrl = null;

    if (req.file) {
      imagenUrl = `/uploads/${req.file.filename}`;
    } else {
      return res.status(400).json({ error: "Falta imagen" });
    }

    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre,
        descripcion,
        precio: Number(precio),
        stock: Number(stock),
        imagenUrl,
      },
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

export const updateProducto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nombre, descripcion, precio, stock } = req.body;

  try {
    const productoActual = await prisma.producto.findUnique({ where: { id } });
    if (!productoActual) return res.status(404).json({ error: "Producto no encontrado" });

    let imagenUrl = productoActual.imagenUrl;

    if (req.file) {
      imagenUrl = `/uploads/${req.file.filename}`;
      // Borrar imagen vieja
      if (productoActual.imagenUrl) {
        const oldImagePath = `.${productoActual.imagenUrl}`;
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error al borrar imagen vieja:", err);
        });
      }
    }

    const productoActualizado = await prisma.producto.update({
      where: { id },
      data: {
        nombre,
        descripcion,
        precio: Number(precio),
        stock: Number(stock),
        imagenUrl,
      },
    });

    res.json(productoActualizado);
  } catch (error) {
    console.error(error);
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
