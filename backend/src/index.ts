import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import path from "path";
import authRoutes from "./routes/auth.routes";
import productosRouter from "./routes/productos.routes";
import pedidosRoutes from "./routes/pedidos.routes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/productos", productosRouter);
app.use("/api/pedidos", pedidosRoutes);

// Ruta de prueba rápida
app.get("/api/test", (_req, res) => {
  res.status(200).json({ message: "Servidor funcionando correctamente 🔥" });
});

// Ejemplo de consulta directa a usuarios
app.get("/api/users", async (_req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al consultar usuarios:", error);
    res.status(500).json({ error: "Error al consultar usuarios" });
  }
});

// Inicializar servidor usando la variable PORT
app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});


