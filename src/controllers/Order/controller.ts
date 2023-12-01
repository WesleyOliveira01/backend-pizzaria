import { Request, Response } from "express";
import { httpStatus } from "../../routes";
import {
  ActiveOrder,
  DeleteOrderService,
  FinishedOrder,
  ListOrders,
  OpenOrders,
  OrderDetails,
  OrderService,
} from "../../services/Order/Service";

class OrderController {
  static async handler(req: Request, res: Response) {
    try {
      const newOrder = await OrderService.execute({ ...req.body });
      res.status(httpStatus.Sucess).json(newOrder);
    } catch (e) {
      res.status(httpStatus.ServerError).json({ error: e.message });
    }
  }
}

class DeleteOrderController {
  static async handler(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleteOrder = await DeleteOrderService.execute(id);
      res.status(httpStatus.Sucess).json({ message: "order close" });
    } catch (e) {
      res.status(httpStatus.ServerError).json({ error: e.message });
    }
  }
}

class OpenOrdersController {
  static async handler(req: Request, res: Response) {
    try {
      const orders = await OpenOrders.execute();
      return res.status(httpStatus.Sucess).json(orders);
    } catch (error) {
      res.status(httpStatus.ServerError).json({ error: error.message });
    }
  }
}

class ActiveOrderController {
  static async handler(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const updateOrder = await ActiveOrder.execute(id);
      res.status(httpStatus.Sucess).json(updateOrder);
    } catch (error) {
      res.status(httpStatus.ServerError).json({ error: error.message });
    }
  }
}

class ListOrderController {
  static async handler(req: Request, res: Response) {
    try {
      const orders = await ListOrders.execute();
      res.status(httpStatus.Sucess).json(orders);
    } catch (error) {
      res.status(httpStatus.ServerError).json({ error: error.message });
    }
  }
}

class OrderDetailsController {
  static async handler(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const orderDetails = await OrderDetails.execute(id);
      res.status(httpStatus.Sucess).json(orderDetails);
    } catch (error) {
      res.status(httpStatus.ServerError).json({ error: error.message });
    }
  }
}

class FinishedOrderController {
  static async handler(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const finishedOrder = await FinishedOrder.execute(id);
      res.status(httpStatus.Sucess).json(finishedOrder);
    } catch (error) {
      res.status(httpStatus.ServerError).json({ error: error.message });
    }
  }
}
export {
  ActiveOrderController,
  DeleteOrderController,
  ListOrderController,
  OpenOrdersController,
  OrderController,
  OrderDetailsController,
  FinishedOrderController
};
