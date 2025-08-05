import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_inseguro'

export const generarToken = (payload: object): string =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' })