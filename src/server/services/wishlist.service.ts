import { db } from "@/server/db";
import { getRedisClient } from "@/server/redis";

const wishlistKey = (userId: string) => `wishlist:${userId}`;
const WISHLIST_TTL = 60 * 60 * 24 * 30;

const redis = getRedisClient();

export const WishlistService = {
  get: async (userId: string): Promise<string[]> => {
    const raw = await redis.get(wishlistKey(userId));
    if (raw) return JSON.parse(raw) as string[];

    const dbWish = await db.wishlist.findFirst({
      where: { userId },
      include: { items: true },
    });
    const arr = dbWish ? dbWish.items.map((i) => i.productId) : [];
    await redis.setex(wishlistKey(userId), WISHLIST_TTL, JSON.stringify(arr));
    return arr;
  },

  add: async (userId: string, productId: string) => {
    const list = await WishlistService.get(userId);
    if (!list.includes(productId)) list.push(productId);
    await redis.setex(wishlistKey(userId), WISHLIST_TTL, JSON.stringify(list));
    return list;
  },

  remove: async (userId: string, productId: string) => {
    const list = await WishlistService.get(userId);
    const updated = list.filter((p) => p !== productId);
    await redis.setex(wishlistKey(userId), WISHLIST_TTL, JSON.stringify(updated));
    return updated;
  },

  clear: async (userId: string) => redis.del(wishlistKey(userId)),
};
