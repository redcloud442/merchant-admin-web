import {
  company_member_table,
  company_referral_link_table,
  user_table,
} from "@/generated/companyMithril";
import { getTenantSupabase } from "@/lib/supabase/server";
import { getTenantPrisma } from "@/lib/tenantConfig";
import { redirect } from "next/navigation";

export const protectionMemberUser = async (
  companyName: "district-1" | "warehouse-pal-project"
) => {
  const supabase = await getTenantSupabase(companyName);

  if ("redirect" in supabase) {
    return redirect(`/login/${companyName}`);
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
      return { redirect: `/login/${companyName}` };
    }

    const userId = authData.user.id;

    let user: any;

    if (companyName === "warehouse-pal-project") {
      user = await getTenantPrisma(
        "warehouse-pal-project"
      ).user_table.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          user_username: true,
          user_first_name: true,
          user_last_name: true,
          user_date_created: true,
          user_profile_picture: true,
          company_member_table: {
            select: {
              company_member_id: true,
              company_member_role: true,
              company_member_restricted: true,
              company_member_company_id: true,
              company_member_date_created: true,
              company_member_date_updated: true,
              company_member_is_active: true,
              company_referral_link_table: {
                select: {
                  company_referral_link: true,
                },
              },
            },
          },
        },
      });
      const companyTeam = await getTenantPrisma(
        "warehouse-pal-project"
      ).company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
      });

      const team = await getTenantPrisma(
        "warehouse-pal-project"
      ).company_table.findFirst({
        where: {
          company_id: companyTeam?.company_id,
        },
      });

      if (!companyTeam) {
        return { redirect: `/${team?.company_name}/dashboard` };
      }
    } else {
      const user = await getTenantPrisma(
        "warehouse-pal-project"
      ).user_table.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          user_username: true,
          user_first_name: true,
          user_last_name: true,
          user_date_created: true,
          user_profile_picture: true,
          company_member_table: {
            select: {
              company_member_id: true,
              company_member_role: true,
              company_member_restricted: true,
              company_member_date_created: true,
              company_member_date_updated: true,
              company_member_company_id: true,
              company_member_is_active: true,
              company_referral_link_table: {
                select: {
                  company_referral_link: true,
                },
              },
            },
          },
        },
      });
      const companyTeam = await getTenantPrisma(
        "warehouse-pal-project"
      ).company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
      });

      const team = await getTenantPrisma(
        "warehouse-pal-project"
      ).company_table.findFirst({
        where: {
          company_id: companyTeam?.company_id,
        },
      });

      if (!companyTeam) {
        return { redirect: `/${team?.company_name}/dashboard` };
      }
    }

    if (
      !["MERCHANT", "ACCOUNTING", "ACCOUNTING_HEAD"].includes(
        user.company_member_table[0]?.company_member_role
      )
    ) {
      return { redirect: "/404" };
    }

    if (user.company_member_table[0]?.company_member_restricted) {
      return { redirect: "/500" };
    }

    if (!user.company_member_table[0].company_referral_link_table[0]) {
      return { redirect: "/500" };
    }

    const referral =
      user.company_member_table[0]?.company_referral_link_table[0];

    return {
      profile: user as unknown as user_table,
      teamMemberProfile: user
        .company_member_table[0] as unknown as company_member_table,
      referral: referral as unknown as company_referral_link_table,
    };
  } catch (e) {
    console.log(e);
    return { redirect: "/500" };
  }
};

export const protectionMemberUserAccounting = async (
  companyName: "district-1" | "warehouse-pal-project"
) => {
  const supabase = await getTenantSupabase(companyName);
  if ("redirect" in supabase) {
    return redirect(`/login/${companyName}`);
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
      return { redirect: `/login/${companyName}` };
    }

    const userId = authData.user.id;

    let user: any;

    if (companyName === "warehouse-pal-project") {
      user = await getTenantPrisma(
        "warehouse-pal-project"
      ).user_table.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          user_username: true,
          user_first_name: true,
          user_last_name: true,
          user_date_created: true,
          user_profile_picture: true,
          company_member_table: {
            select: {
              company_member_id: true,
              company_member_role: true,
              company_member_company_id: true,
              company_member_restricted: true,
              company_member_date_created: true,
              company_member_date_updated: true,
              company_member_is_active: true,
              company_referral_link_table: {
                select: {
                  company_referral_link: true,
                },
              },
            },
          },
        },
      });

      const companyTeam = await getTenantPrisma(
        "warehouse-pal-project"
      ).company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
      });

      const team = await getTenantPrisma(
        "warehouse-pal-project"
      ).company_table.findFirst({
        where: {
          company_id: companyTeam?.company_id,
        },
      });

      if (!companyTeam) {
        return { redirect: `/${team?.company_name}/dashboard` };
      }
    } else {
      user = await getTenantPrisma(
        "warehouse-pal-project"
      ).user_table.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          user_username: true,
          user_first_name: true,
          user_last_name: true,
          user_date_created: true,
          user_profile_picture: true,
          company_member_table: {
            select: {
              company_member_id: true,
              company_member_role: true,
              company_member_company_id: true,
              company_member_restricted: true,
              company_member_date_created: true,
              company_member_date_updated: true,
              company_member_is_active: true,
              company_referral_link_table: {
                select: {
                  company_referral_link: true,
                },
              },
            },
          },
        },
      });
      const companyTeam = await getTenantPrisma(
        "warehouse-pal-project"
      ).company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
      });

      const team = await getTenantPrisma(
        "warehouse-pal-project"
      ).company_table.findFirst({
        where: {
          company_id: companyTeam?.company_id,
        },
      });

      if (!companyTeam) {
        return { redirect: `/${team?.company_name}/dashboard` };
      }
    }

    if (
      !["ACCOUNTING", "ACCOUNTING_HEAD", "ADMIN"].includes(
        user.company_member_table[0]?.company_member_role
      )
    ) {
      return { redirect: "/404" };
    }

    if (user.company_member_table[0]?.company_member_restricted) {
      return { redirect: "/500" };
    }

    if (!user.company_member_table[0].company_referral_link_table[0]) {
      return { redirect: "/500" };
    }

    const referral =
      user.company_member_table[0]?.company_referral_link_table[0];

    return {
      profile: user as unknown as user_table,
      teamMemberProfile: user
        .company_member_table[0] as unknown as company_member_table,
      referral: referral as unknown as company_referral_link_table,
    };
  } catch (e) {
    return { redirect: "/500" };
  }
};

export const protectionMemberUserMerchant = async (
  companyName: "district-1" | "warehouse-pal-project"
) => {
  const supabase = await getTenantSupabase(companyName);
  if ("redirect" in supabase) {
    return redirect(`/login/${companyName}`);
  }

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
      return { redirect: `/login/${companyName}` };
    }

    const userId = authData.user.id;

    let user: any;

    if (companyName === "warehouse-pal-project") {
      user = await getTenantPrisma(
        "warehouse-pal-project"
      ).user_table.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          user_username: true,
          user_first_name: true,
          user_last_name: true,
          user_date_created: true,
          user_profile_picture: true,
          company_member_table: {
            select: {
              company_member_id: true,
              company_member_company_id: true,
              company_member_role: true,
              company_member_restricted: true,
              company_member_date_created: true,
              company_member_date_updated: true,
              company_member_is_active: true,
              company_referral_link_table: {
                select: {
                  company_referral_link: true,
                },
              },
            },
          },
        },
      });

      const companyTeam = await getTenantPrisma(
        "warehouse-pal-project"
      ).company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
      });

      const team = await getTenantPrisma(
        "warehouse-pal-project"
      ).company_table.findFirst({
        where: {
          company_id: companyTeam?.company_id,
        },
      });

      if (!companyTeam) {
        return { redirect: `/${team?.company_name}/dashboard` };
      }
    } else {
      user = await getTenantPrisma(
        "warehouse-pal-project"
      ).user_table.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          user_username: true,
          user_first_name: true,
          user_last_name: true,
          user_date_created: true,
          user_profile_picture: true,
          company_member_table: {
            select: {
              company_member_id: true,
              company_member_role: true,
              company_member_restricted: true,
              company_member_date_created: true,
              company_member_date_updated: true,
              company_member_is_active: true,
              company_referral_link_table: {
                select: {
                  company_referral_link: true,
                },
              },
            },
          },
        },
      });
      const companyTeam = await getTenantPrisma(
        "warehouse-pal-project"
      ).company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
      });

      const team = await getTenantPrisma(
        "warehouse-pal-project"
      ).company_table.findFirst({
        where: {
          company_id: companyTeam?.company_id,
        },
      });

      if (!companyTeam) {
        return { redirect: `/${team?.company_name}/dashboard` };
      }
    }

    if (
      !["MERCHANT"].includes(user.company_member_table[0]?.company_member_role)
    ) {
      return { redirect: "/404" };
    }

    if (user.company_member_table[0]?.company_member_restricted) {
      return { redirect: "/500" };
    }

    if (!user.company_member_table[0].company_referral_link_table[0]) {
      return { redirect: "/500" };
    }

    const referral =
      user.company_member_table[0]?.company_referral_link_table[0];

    return {
      profile: user as unknown as user_table,
      teamMemberProfile: user
        .company_member_table[0] as unknown as company_member_table,
      referral: referral as unknown as company_referral_link_table,
    };
  } catch (e) {
    return { redirect: "/500" };
  }
};
