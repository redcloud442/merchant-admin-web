// scripts/generateAllClients.ts
import { $ } from "bun";

await $`bunx prisma generate --schema=prisma/companyElevate/schema.prisma`
await $`bunx prisma generate --schema=prisma/companyPrime/schema.prisma`

console.log("✅ Prisma clients for Elevate and Prime generated!")
