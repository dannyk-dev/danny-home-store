import { z } from "zod";
import { CurrencyEnum } from "./enums";
import { slugRegex } from "@/lib/schemas/category";


export const imageArraySchema = z.array(z.string().url()).min(1);

export const productVariantInput = z.object({
  sku: z.string().min(1),
  barcode: z.string().optional(),
  ean: z.string().optional(),
  price: z.preprocess((v) => parseFloat(v as string), z.number().positive()),
  currency: CurrencyEnum.default("BRL"),
  stock: z.number().int().nonnegative().default(0),
  attributes: z.record(z.string()).optional(),
  weightGrams: z.number().int().positive().optional(),
  widthMm: z.number().int().positive().optional(),
  heightMm: z.number().int().positive().optional(),
  lengthMm: z.number().int().positive().optional(),
  active: z.boolean().default(true),
});

export const createProductSchema = z.object({
  name: z.string().min(2),
  slug: z.string().regex(slugRegex),
  description: z.string().optional(),
  richDesc: z.any().optional(),
  brand: z.string().optional(),
  images: imageArraySchema,
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  taxable: z.boolean().default(true),
  categoryId: z.string().uuid(),
  defaultPrice: z.preprocess((v) => parseFloat(v as string), z.number().positive()),
  currency: CurrencyEnum.default("BRL"),
  active: z.boolean().default(true),
  variants: z.array(productVariantInput).optional(),
});
export const updateProductSchema = createProductSchema.partial();
export const productIdSchema = z.object({ id: z.string().uuid() });

export type TCreateProductSchema = z.infer<typeof createProductSchema>
export type TUpdateProductSchema = z.infer<typeof updateProductSchema>
export type TProductVariantSchema = z.infer<typeof productVariantInput>
