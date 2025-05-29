import WithdrawalPage from "@/components/WithdrawalPage/WithdrawalPage";
import { protectionMemberUserAccounting } from "@/lib/serverSideProtection";
import { CompanyName } from "@/lib/types";
import { Suspense } from "react";
import Loading from "../loading";
const page = async ({
  params,
}: {
  params: Promise<{ companyName: CompanyName }>;
}) => {
  const { companyName } = await params;

  await protectionMemberUserAccounting(companyName as CompanyName);

  return (
    <Suspense fallback={<Loading />}>
      <WithdrawalPage companyName={companyName} />
    </Suspense>
  );
};

export default page;
