// scripts/generateAllClients.ts
import { $ } from "bun";

await Promise.all([
  $`bunx prisma generate --schema=prisma/companyAdamant/schema.prisma`,
  $`bunx prisma generate --schema=prisma/companyMithril/schema.prisma`,
  $`bunx prisma generate --schema=prisma/companyTeamd/schema.prisma`,
  $`bunx prisma generate --schema=prisma/companyTierone/schema.prisma`,
]);

console.log(
  "✅ Prisma clients for Mithril, Teamd, Adamant and Tierone generated!"
);
