import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middlewares/auth.middleware";

const prisma = new PrismaClient();

// GET - Lista todos los productos
export const getProductos = async (req: Request, res: Response) => {
  try {
    const productos = await prisma.producto.findMany();
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// GET - Producto por ID
export const getProductoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await prisma.producto.findUnique({
      where: { id: parseInt(id) },
    });

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener producto" });
  }
};

// POST - Crear producto (solo admin)
export const createProducto = async (req: AuthRequest, res: Response) => {
  if (req.user?.rol !== "admin") {
    return res.status(403).json({ error: "No autorizado" });
  }

  try {
    const { nombre, descripcion, precio, imagen } = req.body;

    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre: String(nombre),
        descripcion: String(descripcion),
        precio: typeof precio === "string" ? parseFloat(precio) : precio,
        imagen: imagen ? String(imagen) : "",
      },
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
};

// PUT - Editar producto (solo admin)
export const updateProducto = async (req: AuthRequest, res: Response) => {
  if (req.user?.rol !== "admin") {
    return res.status(403).json({ error: "No autorizado" });
  }

  const { id } = req.params;
  const { nombre, descripcion, precio, imagen } = req.body;

  try {
    const producto = await prisma.producto.update({
      where: { id: parseInt(id) },
      data: { nombre, descripcion, precio: parseFloat(precio), imagen },
    });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

// DELETE - Borrar producto (solo admin)
export const deleteProducto = async (req: AuthRequest, res: Response) => {
  if (req.user?.rol !== "admin") {
    return res.status(403).json({ error: "No autorizado" });
  }

  const { id } = req.params;

  try {
    await prisma.producto.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};
