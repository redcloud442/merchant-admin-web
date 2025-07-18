"use client";

import { Button } from "@/components/ui/button";
import { useRole } from "@/lib/context";
import { bgColor } from "@/lib/function";
import { CompanyName } from "@/lib/types";
import Link from "next/link";

const DashboardPage = ({ companyName }: { companyName: string }) => {
  const { teamMemberProfile } = useRole();

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen space-y-4 ${bgColor(
        companyName as CompanyName
      )} text-white`}
    >
      <h1 className="text-4xl font-bold">Welcome to the dashboard</h1>
      <p className="text-lg">
        This is the dashboard for the company {companyName}
      </p>

      {teamMemberProfile?.company_member_role === "MERCHANT" && (
        <>
          <Link href={`/${companyName}/merchant`}>
            <Button>MOP</Button>
          </Link>
          <Link href={`/${companyName}/deposit`}>
            <Button>Deposit</Button>
          </Link>
        </>
      )}
      {(teamMemberProfile?.company_member_role === "ACCOUNTING" ||
        teamMemberProfile?.company_member_role === "ACCOUNTING_HEAD") && (
        <Link href={`/${companyName}/accounting`}>
          <Button>Accounting</Button>
        </Link>
      )}
    </div>
  );
};

export default DashboardPage;
