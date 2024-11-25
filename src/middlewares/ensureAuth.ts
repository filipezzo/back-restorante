// src/middleware/auth.ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export const authenticateJWT = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return response.sendStatus(403);
  }

  const authSecret = process.env.AUTH_SECRET;
  if (!authSecret) {
    return response.status(500).json({ message: "Erro." });
  }

  jwt.verify(token, authSecret, (err, user) => {
    if (err) {
      console.log(err);
      return response.sendStatus(403);
    }

    request.user = user as JwtPayload;
    next();
  });
};
