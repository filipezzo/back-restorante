import { RecipesController } from "@/controller/recipes-controller.js";
import { Router } from "express";

const recipesRoutes = Router();
const recipeController = new RecipesController();

recipesRoutes.post("/", recipeController.create);

export { recipesRoutes };
