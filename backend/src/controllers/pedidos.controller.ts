import { Request, Response } from "express";
import prisma from "../prismaClient";

export const crearPedido = async (req: Request, res: Response) => {
  try {
    const { items, total } = req.body;
    const userId = (req as any).user.id; // viene del middleware JWT

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "El pedido debe tener items" });
    }

    const pedido = await prisma.pedido.create({
      data: {
        usuarioId: userId,
        total,
        items: {
          create: items.map((item: any) => ({
            productoId: item.productoId,
            cantidad: item.cantidad,
            precio: item.precio,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el pedido" });
  }
};
