// scripts/generateAllClients.ts
import { $ } from "bun";

await $`bunx prisma generate --schema=prisma/companyMithril/schema.prisma`;

console.log("✅ Prisma clients for Mithril generated!");
