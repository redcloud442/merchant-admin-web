import MerchantPage from "@/components/MerchantPage/MerchantPage";
import { protectionMemberUserMerchant } from "@/lib/serverSideProtection";

const page = async ({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) => {
  const { companyName } = await params;

  await protectionMemberUserMerchant(companyName as "elevate" | "prime");

  return <MerchantPage companyName={companyName} />;
};

export default page;
