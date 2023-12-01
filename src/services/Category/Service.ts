import { db } from "../prisma/DbConnect";

class CategoryService {
  static async execute(name: string) {
    const hasCategory = await db.category.findFirst({ where: { name } });
    if (hasCategory) throw new Error("Category already exist");
    if (!name) throw new Error("Name is required");

    const category = await db.category.create({
      data: { name },
      select: { name: true },
    });

    return category;
  }
}

class ListCategorysService {
  static async execute() {
    const categorys = await db.category.findMany({select:{id:true,name:true}});

    if (categorys.length === 0) throw new Error("Categorys not found");

    return categorys;
  }
}

export { CategoryService, ListCategorysService };
