import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import authRoutes from './routes/auth.routes'
import productosRouter from './routes/productos';



dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use("/api/productos", productosRouter);

app.get('/api/test', (_req, res) => {
  res.status(200).json({ message: 'Servidor funcionando correctamente 🔥' })
})

app.get('/api/users', async (_req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany()
    res.json(usuarios)
  } catch (error) {
    console.error('Error al consultar usuarios:', error)
    res.status(500).json({ error: 'Error al consultar usuarios' })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

