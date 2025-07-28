// import { redis } from "../cache/redis";
import { z } from "zod";
// import type { CartItem, ProductVariant } from "@prisma/client";
import type { CartItem, ProductVariant } from "prisma/interfaces";
import { db } from "@/server/db";
import { getRedisClient } from "@/server/redis";

const cartItemSchema = z.object({
  variantId: z.string().uuid(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
  currency: z.string(),
});
export type ICartItem = z.infer<typeof cartItemSchema>;

export interface ICart {
  userId: string;
  currency: string;
  items: ICartItem[];
  updatedAt: number;
}

const CART_TTL = 60 * 60 * 24 * 30;
const cartKey = (userId: string) => `cart:${userId}`;

const redis = getRedisClient();

export const CartService = {
  get: async (userId: string): Promise<ICart> => {
    const raw = await redis.get(cartKey(userId));
    if (raw) return JSON.parse(raw) as ICart;

    return { userId, currency: "BRL", items: [], updatedAt: Date.now() };
  },

  save: async (cart: ICart) => {
    cart.updatedAt = Date.now();
    await redis.setex(cartKey(cart.userId), CART_TTL, JSON.stringify(cart));
    return cart;
  },

  addItem: async (userId: string, item: ICartItem) => {
    const cart = await CartService.get(userId);
    const existing = cart.items.find((i) => i.variantId === item.variantId);
    if (existing) existing.quantity += item.quantity;
    else cart.items.push(item);
    return CartService.save(cart);
  },

  updateQty: async (userId: string, variantId: string, qty: number) => {
    const cart = await CartService.get(userId);
    const line = cart.items.find((i) => i.variantId === variantId);
    if (line) line.quantity = qty;
    return CartService.save(cart);
  },

  removeItem: async (userId: string, variantId: string) => {
    const cart = await CartService.get(userId);
    cart.items = cart.items.filter((i) => i.variantId !== variantId);
    return CartService.save(cart);
  },

  clear: async (userId: string) => redis.del(cartKey(userId)),
};
