import { prisma } from "@/database/prisma.js";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

class UsersController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return response
        .status(400)
        .json({ message: "Este email já está em uso." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const authSecret = process.env.AUTH_SECRET;
    if (!authSecret) {
      return response.status(500).json({ message: "Erro ao gerar o token." });
    }

    const token = jwt.sign({ id: user.id }, authSecret, {
      expiresIn: "1d",
    });

    return response.status(201).json({ token });
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return response.status(400).json({ message: "Usuário não encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.status(401).json({ message: "Senha inválida." });
    }

    const authSecret = process.env.AUTH_SECRET;
    if (!authSecret) {
      return response.status(500).json({ message: "Erro ao gerar o token." });
    }

    const token = jwt.sign({ id: user.id }, authSecret, {
      expiresIn: "1d",
    });

    return response.json({ token });
  }

  async show(request: Request, response: Response) {
    const userId = request.user?.id;
    console.log(userId);

    if (!userId) {
      return response.status(401).json({ message: "Usuário não autenticado." });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return response.status(404).json({ message: "Usuário não encontrado." });
    }

    return response.json(user);
  }
}

export { UsersController };
