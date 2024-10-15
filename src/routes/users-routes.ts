import { UsersController } from "@/controller/users-controller.js";
import { Router } from "express";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get("/", usersController.index);
usersRoutes.post("/", usersController.create);
usersRoutes.get("/:id", usersController.show);

export { usersRoutes };
