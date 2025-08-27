import { Request, Response } from "express";
import prisma from "../prismaClient";

// POST /api/pedidos
export const crearPedido = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { items, total } = req.body;

    const pedido = await prisma.pedido.create({
      data: {
        usuarioId: userId,
        total,
        estado: "pendiente",
        items: {
          create: items.map((item: any) => ({
            productoId: item.id,
            cantidad: item.cantidad,
            precioUnitario: item.precio,
          })),
        },
      },
      include: { items: true },
    });

    res.json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el pedido" });
  }
};

// GET /api/pedidos/mios
export const obtenerMisPedidos = async (req: Request, res: Response) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      where: { usuarioId: req.user?.id },
      include: { items: { include: { producto: true } } },
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos" });
  }
};

// GET /api/pedidos (admin)
export const obtenerTodosPedidos = async (_req: Request, res: Response) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        usuario: true,
        items: { include: { producto: true } },
      },
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener todos los pedidos" });
  }
};

// PUT /api/pedidos/:id (admin)
export const actualizarPedido = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const pedido = await prisma.pedido.update({
      where: { id: Number(id) },
      data: { estado },
    });

    res.json(pedido);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar pedido" });
  }
};

