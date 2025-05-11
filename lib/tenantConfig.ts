// lib/getTenantPrisma.ts
import { PrismaClient as PrismaClientMithril } from "@/generated/companyMithril";
import { createPrismaClient } from "./prismaDynamic";

export const TENANT_CONFIG = {
  "district-1": {
    databaseUrl: process.env.DATABASE_URL_DISTRICT_1!,
  },
  "warehouse-pal-project": {
    databaseUrl: process.env.DATABASE_URL_WAREHOUSE_PROJECT!,
  },
} satisfies Record<string, { databaseUrl: string }>;

type Tenant = keyof typeof TENANT_CONFIG;

export function getTenantPrisma<T extends Tenant>(
  company: T
): T extends "warehouse-pal-project"
  ? PrismaClientMithril
  : PrismaClientMithril {
  const config = TENANT_CONFIG[company.toLowerCase() as Tenant];
  if (!config) throw new Error(`Unknown tenant: ${company}`);

  return createPrismaClient(config, company) as any;
}
