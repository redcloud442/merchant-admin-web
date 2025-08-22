import { company_member_table } from "@/generated/companyMithril";
import { getTenantSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTenantPrisma } from "./tenantConfig";
import { CompanyName } from "./types";

export const protectionMemberUser = async (companyName: CompanyName) => {
  const supabase = await getTenantSupabase(companyName);
  if ("redirect" in supabase) return redirect(`/login/${companyName}`);

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
      return { redirect: `/login/${companyName}` };
    }

    const memberData = {
      company_member_id: authData.user.user_metadata.CompanyMemberId,
      company_member_role: authData.user.user_metadata.Role,
      user_username: authData.user.user_metadata.Username,
      company_member_company_id: authData.user.user_metadata.CompanyId,
    };

    let companyTeam;

    if (companyName === "district-1") {
      const prisma = getTenantPrisma("district-1");
      companyTeam = await prisma.company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
        select: {
          company_id: true,
          company_name: true,
        },
      });
    } else if (companyName === "warehouse-pal-project") {
      const prisma = getTenantPrisma("warehouse-pal-project");
      companyTeam = await prisma.company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
        select: {
          company_id: true,
          company_name: true,
        },
      });
    } else if (companyName === "dispatcher-1") {
      const prisma = getTenantPrisma("dispatcher-1");
      companyTeam = await prisma.company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
        select: {
          company_id: true,
          company_name: true,
        },
      });
    } else if (companyName === "agri-plus") {
      const prisma = getTenantPrisma("agri-plus");
      companyTeam = await prisma.company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
        select: {
          company_id: true,
          company_name: true,
        },
      });
    } else {
      throw new Error("Invalid company name");
    }

    if (companyTeam?.company_id !== memberData.company_member_company_id)
      return { redirect: `/${companyTeam?.company_name}/dashboard` };

    const allowedRoles = ["MERCHANT", "ACCOUNTING", "ACCOUNTING_HEAD"];
    if (!allowedRoles.includes(memberData.company_member_role)) {
      return { redirect: "/404" };
    }

    return {
      teamMemberProfile: memberData as unknown as company_member_table,
    };
  } catch (e) {
    console.error("protectionMemberUser error:", e);
    return { redirect: "/500" };
  }
};

export const protectionMemberUserAccounting = async (
  companyName: CompanyName
) => {
  const supabase = await getTenantSupabase(companyName);
  if ("redirect" in supabase) return redirect(`/login/${companyName}`);

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
      return { redirect: `/login/${companyName}` };
    }

    const memberData = {
      company_member_id: authData.user.user_metadata.CompanyMemberId,
      company_member_role: authData.user.user_metadata.Role,
      user_username: authData.user.user_metadata.Username,
      company_member_company_id: authData.user.user_metadata.CompanyId,
    };

    let companyTeam;

    if (companyName === "district-1") {
      const prisma = getTenantPrisma("district-1");
      companyTeam = await prisma.company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
        select: {
          company_id: true,
          company_name: true,
        },
      });
    } else if (companyName === "warehouse-pal-project") {
      const prisma = getTenantPrisma("warehouse-pal-project");
      companyTeam = await prisma.company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
        select: {
          company_id: true,
          company_name: true,
        },
      });
    } else if (companyName === "dispatcher-1") {
      const prisma = getTenantPrisma("dispatcher-1");
      companyTeam = await prisma.company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
        select: {
          company_id: true,
          company_name: true,
        },
      });
    } else if (companyName === "agri-plus") {
      const prisma = getTenantPrisma("agri-plus");
      companyTeam = await prisma.company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
        select: {
          company_id: true,
          company_name: true,
        },
      });
    } else {
      throw new Error("Invalid company name");
    }

    if (companyTeam?.company_id !== memberData.company_member_company_id)
      return { redirect: `/${companyTeam?.company_name}/dashboard` };

    const allowedRoles = ["ACCOUNTING", "ACCOUNTING_HEAD"];
    if (!allowedRoles.includes(memberData.company_member_role)) {
      return { redirect: "/404" };
    }

    return {
      teamMemberProfile: memberData as unknown as company_member_table,
    };
  } catch (e) {
    console.error("protectionMemberUser error:", e);
    return { redirect: "/500" };
  }
};

export const protectionMemberUserMerchant = async (
  companyName: CompanyName
) => {
  const supabase = await getTenantSupabase(companyName);
  if ("redirect" in supabase) return redirect(`/login/${companyName}`);

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
      return { redirect: `/login/${companyName}` };
    }

    const memberData = {
      company_member_id: authData.user.user_metadata.CompanyId,
      company_member_role: authData.user.user_metadata.Role,
      user_username: authData.user.user_metadata.Username,
      company_member_company_id: authData.user.user_metadata.CompanyId,
    };

    let companyTeam;

    if (companyName === "district-1") {
      const prisma = getTenantPrisma("district-1");
      companyTeam = await prisma.company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
        select: {
          company_id: true,
          company_name: true,
        },
      });
    } else if (companyName === "warehouse-pal-project") {
      const prisma = getTenantPrisma("warehouse-pal-project");
      companyTeam = await prisma.company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
        select: {
          company_id: true,
          company_name: true,
        },
      });
    } else if (companyName === "dispatcher-1") {
      const prisma = getTenantPrisma("dispatcher-1");
      companyTeam = await prisma.company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
        select: {
          company_id: true,
          company_name: true,
        },
      });
    } else if (companyName === "agri-plus") {
      const prisma = getTenantPrisma("agri-plus");
      companyTeam = await prisma.company_table.findFirst({
        where: {
          company_name: {
            equals: companyName,
            mode: "insensitive",
          },
        },
        select: {
          company_id: true,
          company_name: true,
        },
      });
    } else {
      throw new Error("Invalid company name");
    }

    if (companyTeam?.company_id !== memberData.company_member_company_id)
      return { redirect: `/${companyTeam?.company_name}/dashboard` };

    const allowedRoles = ["MERCHANT"];
    if (!allowedRoles.includes(memberData.company_member_role)) {
      return { redirect: "/404" };
    }

    return {
      teamMemberProfile: memberData as unknown as company_member_table,
    };
  } catch (e) {
    console.error("protectionMemberUser error:", e);
    return { redirect: "/500" };
  }
};
