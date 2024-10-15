import { prisma } from "@/database/prisma.js";
import { Request, Response } from "express";
class UsersController {
  async index(request: Request, response: Response) {
    const users = await prisma.user.findMany();
    return response.json(users);
  }

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

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return response.status(201).json(user);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const user = await prisma.user.findUnique({ where: { id } });
    return response.json(user);
  }
}

export { UsersController };
