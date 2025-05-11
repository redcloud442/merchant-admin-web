// lib/prismaDynamic.ts

import { PrismaClient as PrismaClientMithril } from "@/generated/companyMithril";

type Warehouse = "district-1" | "warehouse-pal-project";

type TenantConfig = {
  databaseUrl: string;
};

const prismaClientCache = new Map<string, PrismaClientMithril>();

export function createPrismaClient<T extends Warehouse>(
  config: TenantConfig,
  warehouse: T
): PrismaClientMithril {
  const cacheKey = `${warehouse}-${config.databaseUrl}`;

  if (!prismaClientCache.has(cacheKey)) {
    const client =
      warehouse === "warehouse-pal-project"
        ? new PrismaClientMithril({
            datasources: {
              db: {
                url: config.databaseUrl,
              },
            },
          })
        : new PrismaClientMithril({
            datasources: {
              db: {
                url: config.databaseUrl,
              },
            },
          });

    prismaClientCache.set(cacheKey, client);
  }

  return prismaClientCache.get(cacheKey)! as any;
}
