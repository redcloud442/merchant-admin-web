import TopUpPage from "@/components/TopUpPage/TopUpPage";
import { protectionMemberUserMerchant } from "@/lib/serverSideProtection";
const page = async ({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) => {
  const { companyName } = await params;

  await protectionMemberUserMerchant(
    companyName as "district-1" | "warehouse-pal-project"
  );

  return <TopUpPage companyName={companyName} />;
};

export default page;
