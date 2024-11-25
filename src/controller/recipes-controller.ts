import { prisma } from "@/database/prisma.js";
import { Request, Response } from "express";

class RecipesController {
  async create(request: Request, response: Response) {
    const userId = request.user?.id;
    const { title, description } = request.body;

    if (!title || !description || !userId) {
      return response
        .status(400)
        .json({ message: "Título, descrição e userId são obrigatórios" });
    }

    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        description,
        user: {
          connect: { id: userId },
        },
      },
    });

    return response
      .status(201)
      .json({ message: "Receita criada com sucesso", recipe: newRecipe });
  }

  async index(request: Request, response: Response) {
    const userId = request.user?.id;

    if (!userId) {
      return response.status(401).json({ message: "Usuário não autenticado." });
    }

    const recipes = await prisma.recipe.findMany({
      where: { userId },
      include: {
        user: true,
      },
    });

    return response.json(recipes);
  }

  async delete(request: Request, response: Response) {
    const userId = request.user?.id;
    const { id } = request.params;

    if (!userId) {
      return response.status(401).json({ message: "Usuário não autenticado." });
    }

    const recipe = await prisma.recipe.findUnique({ where: { id } });

    if (!recipe) {
      return response.status(404).json({ message: "Receita não encontrada." });
    }

    if (recipe.userId !== userId) {
      return response.status(403).json({ message: "Acesso negado." });
    }
    await prisma.recipe.delete({
      where: { id },
    });
    return response.status(204).send();
  }
}

export { RecipesController };
