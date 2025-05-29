import LoginPage from "@/components/LoginPage/LoginPage";
import { getTenantSupabase } from "@/lib/supabase/server";
import { CompanyName } from "@/lib/types";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ warehouse: string }> }) => {
  const { warehouse } = await params;

  const supabase = await getTenantSupabase(warehouse as CompanyName);

  if ("redirect" in supabase) {
    return redirect(`/login/${warehouse}`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(`/${warehouse}/dashboard`);
  }

  return <LoginPage companyName={warehouse as CompanyName} />;
};

export default page;
