import { SessionsController } from "@/controller/sessions-controller.js";
import { Router } from "express";

const sessionRoutes = Router();

const sessionController = new SessionsController();

sessionRoutes.post("/", sessionController.create);

export { sessionRoutes };
