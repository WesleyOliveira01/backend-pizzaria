import { Request, Response } from "express";
import { httpStatus } from "../../routes";
import { ListByCategoryService, ProductService } from "../../services/Product/Service";

class ProductController {
  static async handler(req: Request, res: Response) {
    try {
      const {filename:banner} = req.file
      const data = {
        banner,
        ...req.body
      }
      const newProduct = await ProductService.execute({ ...data });
      res.status(httpStatus.Sucess).json(newProduct);
    } catch (e) {
      res.status(httpStatus.ServerError).json({ error: e.message });
    }
  }
}

class ListByCategoryController{
  static async handler(req: Request, res: Response) {
    try {
      const {category} = req.query
      const products = await ListByCategoryService.execute(category as string)
      res.status(httpStatus.Sucess).json(products);
    } catch (e) {
      res.status(httpStatus.ServerError).json({ error: e.message });
    }
  }
}

export { ProductController,ListByCategoryController };