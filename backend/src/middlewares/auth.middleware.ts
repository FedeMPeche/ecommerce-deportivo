import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secreto_inseguro";

export interface AuthRequest extends Request {
  user?: JwtPayload & { id: number; email: string; rol: string };
}

// Middleware principal para verificar JWT
export const verifyJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest["user"];
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};

// Alias para compatibilidad (verifyToken = verifyJWT)
export const verifyToken = verifyJWT;

// Middleware: solo Admin
export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.rol !== "admin") {
    return res
      .status(403)
      .json({ error: "Acceso denegado: se requiere rol admin" });
  }
  next();
};

// Middleware: solo User
export const requireUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.rol !== "user") {
    return res
      .status(403)
      .json({ error: "Acceso denegado: se requiere rol user" });
  }
  next();
};




