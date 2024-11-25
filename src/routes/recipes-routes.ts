import { RecipesController } from "@/controller/recipes-controller.js";
import { authenticateJWT } from "@/middlewares/ensureAuth.js";
import { Router } from "express";

const recipesRoutes = Router();
const recipeController = new RecipesController();

recipesRoutes.get("/", authenticateJWT, recipeController.index);
recipesRoutes.post("/", authenticateJWT, recipeController.create);
recipesRoutes.delete("/:id", authenticateJWT, recipeController.delete);

export { recipesRoutes };
