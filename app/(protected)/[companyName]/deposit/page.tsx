import TopUpPage from "@/components/TopUpPage/TopUpPage";
import { protectionMemberUserMerchant } from "@/lib/serverSideProtection";
import { CompanyName } from "@/lib/types";
import { Suspense } from "react";
import Loading from "../loading";
const page = async ({
  params,
}: {
  params: Promise<{ companyName: CompanyName }>;
}) => {
  const { companyName } = await params;

  await protectionMemberUserMerchant(companyName as CompanyName);

  return (
    <Suspense fallback={<Loading />}>
      <TopUpPage companyName={companyName} />
    </Suspense>
  );
};

export default page;
