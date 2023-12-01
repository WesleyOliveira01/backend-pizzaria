import { db } from "../prisma/DbConnect";

type Item = {
  amount: number;
  product_id: string;
  order_id: string;
};

class ItemService {
  static async execute({ amount, product_id, order_id }: Item) {
    if (!amount) throw new Error("Amount is required");
    if (!product_id) throw new Error("Product id is required");
    if (!order_id) throw new Error("Order id is required");
    if (amount <= 0) throw new Error("Please enter a valid value");

    const product = await db.product.findFirst({ where: { id: product_id } });
    if (!product) throw new Error("Product not found");
    const order = await db.order.findFirst({ where: { id: order_id } });
    if (!order) throw new Error("Order not found");

    const newItem = await db.item.create({
      data: { amount, product_id, order_id },select:{id:true,amount:true,product:{select:{name:true,price:true,description:true,banner:true}}}
    });

    return newItem;
  }
}

class ItemDetailsService {
  static async execute(id: string) {
    const item = await db.item.findFirst({
      where: { id },
      select: {
        id: true,
        amount: true,
        product: {
          select: { name: true, price: true, description: true, banner: true },
        },
      },
    });
    if (!item) throw new Error("Item not found");

    return item;
  }
}

class RemoveItemService {
  static async execute(id: string) {
    const item = await db.item.findFirst({ where: { id } });
    if (!item) throw new Error("Item not found");

    const removedItem = await db.item.delete({ where: { id } });

    return removedItem;
  }
}
export { ItemDetailsService, ItemService, RemoveItemService };
