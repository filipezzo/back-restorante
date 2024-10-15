import { Request, Response } from "express";

class RecipesController {
  async create(request: Request, response: Response) {
    return response.json({ message: "criado" });
  }
}

export { RecipesController };
