import { db } from "../prisma/DbConnect";
type Product = {
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
};

class ProductService {
  static async execute({
    name,
    price,
    description,
    category_id,
    banner,
  }: Product) {
    if (!name) throw new Error("Name is required");
    const hasProduct = await db.product.findFirst({ where: { name } });
    if (hasProduct) throw new Error("Product already exists");
    if (!price) throw new Error("Price is required");
    if (!description) throw new Error("Description is required");
    if (!category_id) throw new Error("Category id is required");
    if (!banner) throw new Error("Banner is required");
    

    const product = await db.product.create({
      data: { name, price, description, category_id, banner },select:{name:true,description:true,banner:true,category:{select:{name:true}}},
    });

    return product;
  }
}

class ListByCategoryService{
  static async execute(category:string){
    const hasCategory = await db.category.findFirst({where:{name:category}})
    if(!hasCategory) throw new Error("Category not found");

    const products = await db.product.findMany({where:{category:{name:category}},select:{name:true,price:true,description:true,banner:true}})

    if(products.length === 0) throw new Error(`Products not found at category ${category}`);
    
    return products
  }
}

export { ProductService,ListByCategoryService };
