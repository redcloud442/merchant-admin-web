import WithdrawalPage from "@/components/WithdrawalPage/WithdrawalPage";
import { protectionMemberUserAccounting } from "@/lib/serverSideProtection";

const page = async ({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) => {
  const { companyName } = await params;

  await protectionMemberUserAccounting(companyName as "elevate" | "prime");

  return <WithdrawalPage companyName={companyName} />;
};

export default page;
