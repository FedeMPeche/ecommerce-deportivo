import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secreto_inseguro";

// Extendemos Request para incluir la propiedad user
export interface AuthRequest extends Request {
  user?: JwtPayload & { id: number; email: string; rol: string };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization; // ya no usamos ["authorization"] porque TS ya lo reconoce
  const token = authHeader?.split(" ")[1]; // Debe venir como: Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      id: number;
      email: string;
      rol: string;
    };

    req.user = decoded; // { id, email, rol, iat, exp }
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};
