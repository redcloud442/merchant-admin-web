"use client";

import { Button } from "@/components/ui/button";
import { useRole } from "@/lib/context";
import Link from "next/link";

const DashboardPage = ({ companyName }: { companyName: string }) => {
  const { teamMemberProfile } = useRole();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-stone-900 text-white">
      <h1 className="text-4xl font-bold">Welcome to the dashboard</h1>
      <p className="text-lg">
        This is the dashboard for the company {companyName}
      </p>

      {teamMemberProfile?.alliance_member_role === "MERCHANT" && (
        <>
          <Link href={`/${companyName}/merchant`}>
            <Button>MOP</Button>
          </Link>
          <Link href={`/${companyName}/deposit`}>
            <Button>Deposit</Button>
          </Link>
        </>
      )}
      {(teamMemberProfile?.alliance_member_role === "ACCOUNTING" ||
        teamMemberProfile?.alliance_member_role === "ACCOUNTING_HEAD") && (
        <Link href={`/${companyName}/accounting`}>
          <Button>Accounting</Button>
        </Link>
      )}
    </div>
  );
};

export default DashboardPage;
