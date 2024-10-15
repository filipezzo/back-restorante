import { Router } from "express";

import { recipesRoutes } from "./recipes-routes.js";
import { sessionRoutes } from "./session-routes.js";
import { usersRoutes } from "./users-routes.js";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/recipes", recipesRoutes);

export { routes };
