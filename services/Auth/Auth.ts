import { getTenantAxios } from "@/lib/axios";
import { SupabaseClient } from "@supabase/supabase-js";

export const loginValidation = async (
  warehouse: string,
  supabaseClient: SupabaseClient,
  params: {
    userName: string;
    password: string;
    captchaToken: string;
  }
) => {
  const { userName, password, captchaToken } = params;

  const formattedUserName = userName + "@gmail.com";

  const response = await getTenantAxios(warehouse).post(
    `${warehouse !== "district-1" ? "/auth" : "/access"}`,
    params,
    {
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  const { error: signInError } = await supabaseClient.auth.signInWithPassword({
    email: formattedUserName,
    password,
    options: {
      captchaToken,
    },
  });

  if (signInError) throw signInError;

  return;
};
