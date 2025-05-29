import MerchantPage from "@/components/MerchantPage/MerchantPage";
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
      <MerchantPage companyName={companyName} />
    </Suspense>
  );
};

export default page;
