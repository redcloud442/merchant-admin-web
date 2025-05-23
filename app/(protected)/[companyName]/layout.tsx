// AppLayout.tsx

import LayoutContent from "@/components/ui/layoutContent";
import {
  company_member_table,
  company_referral_link_table,
  user_table,
} from "@/generated/companyMithril";
import { RoleProvider } from "@/lib/context";
import { protectionMemberUser } from "@/lib/serverSideProtection";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ companyName: string }>;
}) {
  const { companyName } = await params;

  const {
    profile,
    redirect: redirectTo,
    teamMemberProfile,
    referral,
  } = await protectionMemberUser(
    companyName as "district-1" | "warehouse-pal-project"
  );

  if (redirectTo) {
    redirect(redirectTo);
  }

  return (
    <RoleProvider
      initialProfile={profile as user_table}
      initialTeamMemberProfile={
        teamMemberProfile as company_member_table & user_table
      }
      initialReferral={referral as company_referral_link_table}
    >
      <LayoutContent companyName={companyName}>{children}</LayoutContent>
    </RoleProvider>
  );
}
