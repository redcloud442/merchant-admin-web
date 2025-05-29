// AppLayout.tsx

import LayoutContent from "@/components/ui/layoutContent";
import { company_member_table, user_table } from "@/generated/companyMithril";
import { RoleProvider } from "@/lib/context";
import { protectionMemberUser } from "@/lib/serverSideProtection";
import { CompanyName } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ companyName: string }>;
}) {
  const { companyName } = await params;

  const { redirect: redirectTo, teamMemberProfile } =
    await protectionMemberUser(companyName as CompanyName);

  if (redirectTo) {
    redirect(redirectTo);
  }

  return (
    <RoleProvider
      initialTeamMemberProfile={
        teamMemberProfile as company_member_table & user_table
      }
    >
      <LayoutContent companyName={companyName}>{children}</LayoutContent>
    </RoleProvider>
  );
}
