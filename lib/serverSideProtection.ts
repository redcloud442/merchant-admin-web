import {
  alliance_member_table,
  alliance_referral_link_table,
  user_table,
} from "@/generated/companyPr1me";
import { getTenantSupabase } from "@/lib/supabase/server";
import { getTenantPrisma } from "@/lib/tenantConfig";

export const protectionMemberUser = async (
  companyName: "elevate" | "prime"
) => {
  const supabase = await getTenantSupabase(companyName);

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
      return { redirect: `/login/${companyName}` };
    }

    const userId = authData.user.id;

    let user: any;

    if (companyName === "elevate") {
      user = await getTenantPrisma("elevate").user_table.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          user_username: true,
          user_first_name: true,
          user_last_name: true,
          user_date_created: true,
          user_profile_picture: true,
          alliance_member_table: {
            select: {
              alliance_member_id: true,
              alliance_member_role: true,
              alliance_member_restricted: true,
              alliance_member_alliance_id: true,
              alliance_member_date_created: true,
              alliance_member_date_updated: true,
              alliance_member_is_active: true,
              alliance_referral_link_table: {
                select: {
                  alliance_referral_link: true,
                },
              },
            },
          },
        },
      });
      const allianceTeam = await getTenantPrisma(
        "elevate"
      ).alliance_table.findFirst({
        where: {
          alliance_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
      });

      const team = await getTenantPrisma("elevate").alliance_table.findFirst({
        where: {
          alliance_id: allianceTeam?.alliance_id,
        },
      });

      if (!allianceTeam) {
        return { redirect: `/${team?.alliance_name}/dashboard` };
      }
    } else {
      user = await getTenantPrisma("prime").user_table.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          user_username: true,
          user_first_name: true,
          user_last_name: true,
          user_date_created: true,
          user_profile_picture: true,
          alliance_member_table: {
            select: {
              alliance_member_id: true,
              alliance_member_role: true,
              alliance_member_restricted: true,
              alliance_member_date_created: true,
              alliance_member_date_updated: true,
              alliance_member_alliance_id: true,
              alliance_member_is_active: true,
              alliance_referral_link_table: {
                select: {
                  alliance_referral_link: true,
                },
              },
            },
          },
        },
      });
      const allianceTeam = await getTenantPrisma(
        "prime"
      ).alliance_table.findFirst({
        where: {
          alliance_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
      });

      const team = await getTenantPrisma("prime").alliance_table.findFirst({
        where: {
          alliance_id: allianceTeam?.alliance_id,
        },
      });

      if (!allianceTeam) {
        return { redirect: `/${team?.alliance_name}/dashboard` };
      }
    }

    if (
      !["MERCHANT", "ACCOUNTING", "ACCOUNTING_HEAD"].includes(
        user.alliance_member_table[0]?.alliance_member_role
      )
    ) {
      return { redirect: "/404" };
    }

    if (user.alliance_member_table[0]?.alliance_member_restricted) {
      return { redirect: "/500" };
    }

    if (!user.alliance_member_table[0].alliance_referral_link_table[0]) {
      return { redirect: "/500" };
    }

    const referral =
      user.alliance_member_table[0]?.alliance_referral_link_table[0];

    return {
      profile: user as unknown as user_table,
      teamMemberProfile: user
        .alliance_member_table[0] as unknown as alliance_member_table,
      referral: referral as unknown as alliance_referral_link_table,
    };
  } catch (e) {
    console.log(e);
    return { redirect: "/500" };
  }
};

export const protectionMemberUserAccounting = async (
  companyName: "elevate" | "prime"
) => {
  const supabase = await getTenantSupabase(companyName);

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
      return { redirect: `/login/${companyName}` };
    }

    const userId = authData.user.id;

    let user: any;

    if (companyName === "elevate") {
      user = await getTenantPrisma("elevate").user_table.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          user_username: true,
          user_first_name: true,
          user_last_name: true,
          user_date_created: true,
          user_profile_picture: true,
          alliance_member_table: {
            select: {
              alliance_member_id: true,
              alliance_member_role: true,
              alliance_member_alliance_id: true,
              alliance_member_restricted: true,
              alliance_member_date_created: true,
              alliance_member_date_updated: true,
              alliance_member_is_active: true,
              alliance_referral_link_table: {
                select: {
                  alliance_referral_link: true,
                },
              },
            },
          },
        },
      });

      const allianceTeam = await getTenantPrisma(
        "elevate"
      ).alliance_table.findFirst({
        where: {
          alliance_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
      });

      const team = await getTenantPrisma("elevate").alliance_table.findFirst({
        where: {
          alliance_id: allianceTeam?.alliance_id,
        },
      });

      if (!allianceTeam) {
        return { redirect: `/${team?.alliance_name}/dashboard` };
      }
    } else {
      user = await getTenantPrisma("prime").user_table.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          user_username: true,
          user_first_name: true,
          user_last_name: true,
          user_date_created: true,
          user_profile_picture: true,
          alliance_member_table: {
            select: {
              alliance_member_id: true,
              alliance_member_role: true,
              alliance_member_alliance_id: true,
              alliance_member_restricted: true,
              alliance_member_date_created: true,
              alliance_member_date_updated: true,
              alliance_member_is_active: true,
              alliance_referral_link_table: {
                select: {
                  alliance_referral_link: true,
                },
              },
            },
          },
        },
      });
      const allianceTeam = await getTenantPrisma(
        "prime"
      ).alliance_table.findFirst({
        where: {
          alliance_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
      });

      const team = await getTenantPrisma("prime").alliance_table.findFirst({
        where: {
          alliance_id: allianceTeam?.alliance_id,
        },
      });

      if (!allianceTeam) {
        return { redirect: `/${team?.alliance_name}/dashboard` };
      }
    }

    if (
      !["ACCOUNTING", "ACCOUNTING_HEAD"].includes(
        user.alliance_member_table[0]?.alliance_member_role
      )
    ) {
      return { redirect: "/404" };
    }

    if (user.alliance_member_table[0]?.alliance_member_restricted) {
      return { redirect: "/500" };
    }

    if (!user.alliance_member_table[0].alliance_referral_link_table[0]) {
      return { redirect: "/500" };
    }

    const referral =
      user.alliance_member_table[0]?.alliance_referral_link_table[0];

    return {
      profile: user as unknown as user_table,
      teamMemberProfile: user
        .alliance_member_table[0] as unknown as alliance_member_table,
      referral: referral as unknown as alliance_referral_link_table,
    };
  } catch (e) {
    return { redirect: "/500" };
  }
};

export const protectionMemberUserMerchant = async (
  companyName: "elevate" | "prime"
) => {
  const supabase = await getTenantSupabase(companyName);

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
      return { redirect: `/login/${companyName}` };
    }

    const userId = authData.user.id;

    let user: any;

    if (companyName === "elevate") {
      user = await getTenantPrisma("elevate").user_table.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          user_username: true,
          user_first_name: true,
          user_last_name: true,
          user_date_created: true,
          user_profile_picture: true,
          alliance_member_table: {
            select: {
              alliance_member_id: true,
              alliance_member_alliance_id: true,
              alliance_member_role: true,
              alliance_member_restricted: true,
              alliance_member_date_created: true,
              alliance_member_date_updated: true,
              alliance_member_is_active: true,
              alliance_referral_link_table: {
                select: {
                  alliance_referral_link: true,
                },
              },
            },
          },
        },
      });

      const allianceTeam = await getTenantPrisma(
        "elevate"
      ).alliance_table.findFirst({
        where: {
          alliance_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
      });

      const team = await getTenantPrisma("elevate").alliance_table.findFirst({
        where: {
          alliance_id: allianceTeam?.alliance_id,
        },
      });

      if (!allianceTeam) {
        return { redirect: `/${team?.alliance_name}/dashboard` };
      }
    } else {
      user = await getTenantPrisma("prime").user_table.findUnique({
        where: { user_id: userId },
        select: {
          user_id: true,
          user_username: true,
          user_first_name: true,
          user_last_name: true,
          user_date_created: true,
          user_profile_picture: true,
          alliance_member_table: {
            select: {
              alliance_member_id: true,
              alliance_member_role: true,
              alliance_member_restricted: true,
              alliance_member_date_created: true,
              alliance_member_date_updated: true,
              alliance_member_is_active: true,
              alliance_referral_link_table: {
                select: {
                  alliance_referral_link: true,
                },
              },
            },
          },
        },
      });
      const allianceTeam = await getTenantPrisma(
        "prime"
      ).alliance_table.findFirst({
        where: {
          alliance_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
      });

      const team = await getTenantPrisma("prime").alliance_table.findFirst({
        where: {
          alliance_id: allianceTeam?.alliance_id,
        },
      });

      if (!allianceTeam) {
        return { redirect: `/${team?.alliance_name}/dashboard` };
      }
    }

    if (
      !["MERCHANT"].includes(
        user.alliance_member_table[0]?.alliance_member_role
      )
    ) {
      return { redirect: "/404" };
    }

    if (user.alliance_member_table[0]?.alliance_member_restricted) {
      return { redirect: "/500" };
    }

    if (!user.alliance_member_table[0].alliance_referral_link_table[0]) {
      return { redirect: "/500" };
    }

    const referral =
      user.alliance_member_table[0]?.alliance_referral_link_table[0];

    return {
      profile: user as unknown as user_table,
      teamMemberProfile: user
        .alliance_member_table[0] as unknown as alliance_member_table,
      referral: referral as unknown as alliance_referral_link_table,
    };
  } catch (e) {
    return { redirect: "/500" };
  }
};
