import TopUpPage from "@/components/TopUpPage/TopUpPage";
import { protectionMemberUserMerchant } from "@/lib/serverSideProtection";
const page = async ({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) => {
  const { companyName } = await params;

  await protectionMemberUserMerchant(companyName as "elevate" | "prime");

  return <TopUpPage companyName={companyName} />;
};

export default page;
