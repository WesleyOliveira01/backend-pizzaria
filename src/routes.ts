import { Request, Response, Router } from "express";
import multer from "multer";
import fileOptions from "../config/multer";

import { AuthController } from "./controllers/Auth/controler";
import {
  CategoryController,
  ListCategorysController,
} from "./controllers/Category/Controller";
import {
  ItemController,
  ItemDetailsController,
  RemoveItemController,
} from "./controllers/Item/controller";
import {
  ActiveOrderController,
  DeleteOrderController,
  FinishedOrderController,
  ListOrderController,
  OpenOrdersController,
  OrderController,
  OrderDetailsController,
} from "./controllers/Order/controller";
import {
  ListByCategoryController,
  ProductController,
} from "./controllers/Product/Controller";
import { UserController } from "./controllers/User/Controller";
import { authValidate } from "./middleware/ValidateToken";

const routes = Router();

const upload = multer(fileOptions.upload("tmp"));

const httpStatus = {
  Sucess: 200,
  BadRequest: 400,
  NotFound: 404,
  ServerError: 500,
  unauthorized: 401,
};

routes.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.Sucess).json({ message: "get is ok" });
});

routes.post("/auth", AuthController.handler);

routes.post("/newUser", authValidate, UserController.handler);

// Categorys routes

routes.post("/newCategory", authValidate, CategoryController.handler);

routes.get("/categorys", authValidate, ListCategorysController.handler);

// Product routes

routes.post(
  "/newProduct",
  authValidate,
  upload.single("banner"),
  ProductController.handler
);

routes.get(
  "/productsByCategory",
  authValidate,
  ListByCategoryController.handler
);

// Order routes

routes.post("/newOrder", authValidate, OrderController.handler);

routes.delete("/deleteOrder/:id", authValidate, DeleteOrderController.handler);

routes.get("/openOrders", authValidate, OpenOrdersController.handler);

routes.get("/orders", authValidate, ListOrderController.handler);

routes.get("/orderDetails/:id",authValidate,OrderDetailsController.handler)

routes.put("/activeOrder/:id", authValidate, ActiveOrderController.handler);

routes.put("/finishedOrder/:id",authValidate,FinishedOrderController.handler)

// Item routes

routes.post("/newItem", authValidate, ItemController.handler);

routes.get("/itemDetails/:id", authValidate, ItemDetailsController.handler);

routes.delete("/removeItem/:id", authValidate, RemoveItemController.handler);

export { httpStatus, routes };
