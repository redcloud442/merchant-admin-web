// scripts/generateAllClients.ts
import { $ } from "bun";

await $`bunx prisma generate --schema=prisma/companyMithril/schema.prisma`;
await $`bunx prisma generate --schema=prisma/companyTeamd/schema.prisma`;

console.log("✅ Prisma clients for Mithril and Teamd generated!");
