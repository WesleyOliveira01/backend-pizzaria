import { Request, Response } from "express";
import { httpStatus } from "../../routes";
import { AuthService } from "../../services/Auth/Service";

class AuthController {
  static async handler(req: Request, res: Response) {
    try {
      const authUser = await AuthService.execute({ ...req.body });
      res.status(httpStatus.Sucess).json(authUser);
    } catch (e) {
      res.status(httpStatus.ServerError).json({ error: e.message });
    }
  }
}

export {AuthController}