import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_inseguro'

export const register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body; // ← aquí ahora usamos name

  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Campos obligatorios faltantes' });
  }

  try {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });

    if (usuarioExistente) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await prisma.usuario.create({
      data: { email, nombre: name, password: hashedPassword }, // ← asigna a "nombre" en DB
    });

    res.status(201).json({ message: 'Usuario registrado correctamente', id: nuevoUsuario.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Campos obligatorios faltantes' })
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } })

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const passwordValido = await bcrypt.compare(password, usuario.password)

    if (!passwordValido) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      JWT_SECRET,
      { expiresIn: '2h' }
    )

    res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
}