import { authCfg } from "@/configs/auth.js";
import { AppError } from "@/utils/AppError.js";
import { Request, Response } from "express";
import webtoken from "jsonwebtoken";

class SessionsController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const fakeUser = {
      id: "1",
      username: "filipe",
      password: "235456677",
    };

    if (username !== fakeUser.username || password !== fakeUser.password) {
      throw new AppError("Usuário ou senha incorreta", 400);
    }
    const { secret, expiresIn } = authCfg.jwt;
    const token = webtoken.sign({}, secret, {
      expiresIn,
      subject: String(fakeUser.id),
    });

    return response.json({ token });
  }
}

export { SessionsController };
