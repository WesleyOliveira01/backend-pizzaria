import { db } from "../prisma/DbConnect";

type newOrder = {
  name?: string;
  table: number;
};

class OrderService {
  static async execute({ name, table }: newOrder) {
    const hasOrder = await db.order.findFirst({ where: { table } });
    if (hasOrder) throw new Error("Order already exist");

    const order = await db.order.create({ data: { name, table } });
    return order;
  }
}

class DeleteOrderService {
  static async execute(id: string) {
    const order = await db.order.findFirst({ where: { id } });
    if (!order) throw new Error("Order not found");

    const deleteOrder = await db.order.delete({ where: { id } });

    return deleteOrder;
  }
}

class OpenOrders {
  static async execute() {
    const orders = await db.order.findMany({
      where: { draft: false },
      select: {
        table: true,
        items: {
          select: {
            amount: true,
            product: { select: { name: true, price: true, description: true } },
          },
        },
      },
    });
    if (orders.length === 0) throw new Error("Orders not found");

    return orders;
  }
}

class ActiveOrder {
  static async execute(id: string) {
    if (!id) throw new Error("Order id is required");

    const hasOrder = await db.order.findFirst({ where: { id } });
    if (!hasOrder) throw new Error("Order not found");

    const updateOrder = await db.order.update({
      where: { id },
      data: { draft: false },
    });

    return updateOrder;
  }
}

class ListOrders {
  static async execute() {
    const orders = await db.order.findMany({
      where: { draft: false, status: false },
      orderBy: {
        created_at: "desc",
      },
    });
    if (!orders) throw new Error("orders not found");

    return orders;
  }
}

class OrderDetails {
  static async execute(id: string) {
    const order = await db.order.findFirst({
      where: { id },
      select: {
        name: true,
        table: true,
        items: {
          select: {
            amount: true,
            product: { select: { name: true, description: true, price: true } },
          },
        },
      },
    });

    if (!order) throw new Error("Order not found");

    return order
  }
}

class FinishedOrder{
  static async execute(id:string){
    const hasOrder = await db.order.findFirst({where:{id,}})
    if(!hasOrder) throw new Error("Order not found");

    const finishedOrder = await db.order.update({where:{id,},data:{status:true}})

    return finishedOrder
    
  }
}
export {
  ActiveOrder,
  DeleteOrderService,
  ListOrders,
  OpenOrders,
  OrderService,
  OrderDetails,
  FinishedOrder
};
