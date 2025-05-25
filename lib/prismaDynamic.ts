// lib/prismaDynamic.ts

import { PrismaClient as PrismaClientMithril } from "@/generated/companyMithril";
import { PrismaClient as PrismaClientTeamd } from "@/generated/companyTeamd";

type Warehouse = "district-1" | "warehouse-pal-project";

type TenantConfig = {
  databaseUrl: string;
};

const prismaClientCache = new Map<
  string,
  PrismaClientMithril | PrismaClientTeamd
>();

export function createPrismaClient<T extends Warehouse>(
  config: TenantConfig,
  warehouse: T
): PrismaClientMithril | PrismaClientTeamd {
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
        : new PrismaClientTeamd({
            datasources: {
              db: {
                url: config.databaseUrl,
              },
            },
          });

    prismaClientCache.set(
      cacheKey,
      client as PrismaClientMithril | PrismaClientTeamd
    );
  }

  return prismaClientCache.get(cacheKey)! as any;
}
