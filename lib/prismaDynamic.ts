// lib/prismaDynamic.ts

import { PrismaClient as PrismaClientElevate } from "@/generated/companyElevate";
import { PrismaClient as PrismaClientPrime } from "@/generated/companyPr1me";

type Warehouse = "district-1" | "warehouse-pal-project";

type TenantConfig = {
  databaseUrl: string;
};

const prismaClientCache = new Map<
  string,
  PrismaClientElevate | PrismaClientPrime
>();

export function createPrismaClient<T extends Warehouse>(
  config: TenantConfig,
  warehouse: T
): T extends "warehouse-pal-project" ? PrismaClientElevate : PrismaClientPrime {
  const cacheKey = `${warehouse}-${config.databaseUrl}`;

  if (!prismaClientCache.has(cacheKey)) {
    const client =
      warehouse === "warehouse-pal-project"
        ? new PrismaClientElevate({
            datasources: {
              db: {
                url: config.databaseUrl,
              },
            },
          })
        : new PrismaClientPrime({
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
