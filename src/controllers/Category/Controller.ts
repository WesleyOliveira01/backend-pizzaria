import { Request, Response } from "express";
import { httpStatus } from "../../routes";
import { CategoryService, ListCategorysService } from "../../services/Category/Service";

class CategoryController {
  static async handler(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const newCategory = await CategoryService.execute(name);
      res.status(httpStatus.Sucess).json(newCategory);
    } catch (e) {
      res.status(httpStatus.NotFound).json({ error: e.message });
    }
  }
}


class ListCategorysController{
    static async handler(req: Request, res: Response) {
        try {
          const allCategorys = await ListCategorysService.execute();
          res.status(httpStatus.Sucess).json(allCategorys);
        } catch (e) {
          res.status(httpStatus.ServerError).json({ error: e.message });
        }
      }
}

export {ListCategorysController,CategoryController}