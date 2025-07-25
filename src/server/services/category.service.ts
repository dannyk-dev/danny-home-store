import { buildCrudService } from "./base.service";
import type { Category } from "@prisma/client";
export const CategoryService = {
  ...buildCrudService<Category, Partial<Category>>("category"),
  listWithChildren: () => prisma.category.findMany({ include: { children: true } }),
};
// desenvolvimento@cloudcrm.tech
/*──────── ProductService — variants & metrics ───────*/
// File: src/server/services/product.service.ts
import { Decimal } from "@prisma/client/runtime/library";
import type { Product, ProductVariant } from "@prisma/client";

export const ProductService = {
  ...buildCrudService<Omit<Product, "id" | "createdAt" | "updatedAt"> & { variants?: ProductVariant[] }, Partial<Product>>("product"),
  // Transactional create to include variants
  create: async (data: any) =>
    prisma.$transaction(async (tx) => {
      const { variants, ...productData } = data;
      const product = await tx.product.create({ data: productData });
      if (variants?.length) {
        await tx.productVariant.createMany({ data: variants.map((v) => ({ ...v, productId: product.id })) });
      }
      return product;
    }),
  // Recompute rating aggregates
  recomputeRating: async (productId: string) => {
    const agg = await prisma.productReview.aggregate({
      where: { productId, approved: true },
      _avg: { rating: true },
      _count: { rating: true },
    });
    return prisma.product.update({ where: { id: productId }, data: { ratingAvg: agg._avg.rating ?? 0, ratingCount: agg._count.rating } });
  },
};
