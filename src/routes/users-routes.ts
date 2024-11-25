import { UsersController } from "@/controller/users-controller.js";
import { authenticateJWT } from "@/middlewares/ensureAuth.js";

import { Router } from "express";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.post("/login", usersController.login);
usersRoutes.get("/me", authenticateJWT, usersController.show);

export { usersRoutes };
