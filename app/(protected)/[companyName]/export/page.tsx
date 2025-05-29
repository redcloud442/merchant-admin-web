import AdminExportPage from "@/components/AdminExportPage/AdminExportPage";
import { protectionMemberUserAccounting } from "@/lib/serverSideProtection";
import { CompanyName } from "@/lib/types";
import { Suspense } from "react";
import Loading from "../loading";

const Page = async ({
  params,
}: {
  params: Promise<{ companyName: CompanyName }>;
}) => {
  const { companyName } = await params;

  await protectionMemberUserAccounting(companyName as CompanyName);

  return (
    <Suspense fallback={<Loading />}>
      <AdminExportPage />
    </Suspense>
  );
};

export default Page;
