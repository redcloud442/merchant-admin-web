import DashboardPage from "@/components/DashboardPage/DashboardPage";
import { protectionMemberUser } from "@/lib/serverSideProtection";

const page = async ({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) => {
  const { companyName } = await params;

  await protectionMemberUser(companyName as "elevate" | "prime");

  return <DashboardPage companyName={companyName} />;
};

export default page;
