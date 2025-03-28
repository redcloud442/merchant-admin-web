// lib/getTenantPrisma.ts
import { PrismaClient as PrismaClientElevate } from "@/generated/companyElevate";
import { PrismaClient as PrismaClientPrime } from "@/generated/companyPr1me";
import { createPrismaClient } from "./prismaDynamic";

export const TENANT_CONFIG = {
  elevate: {
    databaseUrl: process.env.DATABASE_URL_ELEVATE!,
  },
  prime: {
    databaseUrl: process.env.DATABASE_URL_PRIME!,
  },
} satisfies Record<string, { databaseUrl: string }>;

type Tenant = keyof typeof TENANT_CONFIG;

export function getTenantPrisma<T extends Tenant>(
  company: T
): T extends "elevate" ? PrismaClientElevate : PrismaClientPrime {
  const config = TENANT_CONFIG[company.toLowerCase() as Tenant];
  if (!config) throw new Error(`Unknown tenant: ${company}`);

  return createPrismaClient(config, company) as any;
}
