import { PrismaClient as PrismaClientAdamant } from "@/generated/companyAdamant";
import { PrismaClient as PrismaClientMithril } from "@/generated/companyMithril";
import { PrismaClient as PrismaClientTeamd } from "@/generated/companyTeamd";
import { PrismaClient as PrismaClientTierone } from "@/generated/companyTierone";

// Overload declarations for correct return type
export function getTenantPrisma(company: "district-1"): PrismaClientAdamant;
export function getTenantPrisma(
  company: "warehouse-pal-project"
): PrismaClientMithril;
export function getTenantPrisma(company: "dispatcher-1"): PrismaClientTeamd;
export function getTenantPrisma(company: "agri-plus"): PrismaClientTierone;
export function getTenantPrisma(company: string): unknown {
  switch (company) {
    case "district-1":
      return new PrismaClientMithril();
    case "warehouse-pal-project":
      return new PrismaClientTeamd();
    case "dispatcher-1":
      return new PrismaClientAdamant();
    case "agri-plus":
      return new PrismaClientTierone();
    default:
      throw new Error(`Unknown tenant: ${company}`);
  }
}
