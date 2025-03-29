import WithdrawalPage from "@/components/WithdrawalPage/WithdrawalPage";
import { protectionMemberUserAccounting } from "@/lib/serverSideProtection";

const page = async ({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) => {
  const { companyName } = await params;

  await protectionMemberUserAccounting(
    companyName as "district-1" | "warehouse-pal-project"
  );

  return <WithdrawalPage companyName={companyName} />;
};

export default page;
