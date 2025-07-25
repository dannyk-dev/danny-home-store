/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { db } from "@/server/db";

export type PrismaModel = keyof typeof db;

export const buildCrudService = <TCreate, TUpdate>(model: PrismaModel) => {
  const m = prisma[model] as any;
  return {
    create: (data: TCreate) => m.create({ data }),
    list: (args: z.infer<typeof paginationInput> = { page: 1, perPage: 20 }) => {
      const { page, perPage } = args;
      return m.findMany({ skip: (page - 1) * perPage, take: perPage, orderBy: { createdAt: "desc" } });
    },
    byId: (id: string) => m.findUnique({ where: { id } }),
    update: (id: string, data: TUpdate) => m.update({ where: { id }, data }),
    delete: (id: string) => m.delete({ where: { id } }),
  } as const;
};
