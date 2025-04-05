import AdminExportPage from "@/components/AdminExportPage/AdminExportPage";
import { protectionMemberUserAccounting } from "@/lib/serverSideProtection";
import { redirect } from "next/navigation";

const Page = async ({
  params,
}: {
  params: Promise<{ companyName: string }>;
}) => {
  const { companyName } = await params;

  if (companyName !== "district-1") {
    return redirect("/");
  }

  await protectionMemberUserAccounting(
    companyName as "district-1" | "warehouse-pal-project"
  );

  return <AdminExportPage />;
};

export default Page;
