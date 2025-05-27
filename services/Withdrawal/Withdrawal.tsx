import { getTenantAxios } from "@/lib/axios";
import {
  AdminWithdrawaldata,
  HeirarchyData,
  WithdrawListExportData,
} from "@/lib/types";
export const hideUser = async (params: {
  id: string;
  type: "add" | "remove";
  companyName: string;
}) => {
  const response = await getTenantAxios(params.companyName).put(
    "/withdraw/" + params.id + "/hide-user",
    {
      type: params.type,
    }
  );

  if (response.status !== 200) throw new Error("Failed to hide user");

  return response.data;
};

export const updateWithdrawalStatus = async (params: {
  status: string;
  requestId: string;
  note?: string;
  companyName: string;
}) => {
  const { requestId } = params;

  const response = await getTenantAxios(params.companyName).put(
    `/withdraw/` + requestId,
    params
  );

  if (response.status !== 200) {
    throw new Error(
      response.data.error ||
        "An error occurred while creating the top-up request."
    );
  }

  return response;
};

export const getHeirarchy = async (params: {
  allianceMemberId: string;
  companyName: string;
}) => {
  const response = await getTenantAxios(params.companyName).get(
    `/user/${params.allianceMemberId}/tree`
  );

  if (response.status !== 200) {
    throw new Error(
      response.data.error || "An error occurred while fetching the heirarchy."
    );
  }

  return response.data as HeirarchyData[];
};

export const getAdminWithdrawalRequest = async (params: {
  page: number;
  limit: number;
  search?: string;
  columnAccessor: string;
  isAscendingSort: boolean;
  userFilter?: string;
  statusFilter?: string;
  dateFilter?: {
    start: string | undefined;
    end: string | undefined;
  };
  showHiddenUser: boolean;
  companyName: string;
  showAllDays: boolean;
}) => {
  const response = await getTenantAxios(params.companyName).post(
    "/withdraw/list",
    params
  );

  if (response.status !== 200)
    throw new Error("Failed to fetch withdrawal list");

  return response.data as AdminWithdrawaldata;
};

export const getAdminWithdrawalBanList = async (params: {
  take: number;
  skip: number;
}) => {
  const response = await fetch(
    `/api/v1/withdraw/ban-list?take=${params.take}&skip=${params.skip}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  if (!response.ok) throw new Error("Failed to fetch withdrawal total report");

  return result as {
    data: { accountNumber: string }[];
    totalCount: number;
  };
};

export const uploadAdminWithdrawalBanList = async (params: {
  accountNumber: string;
}) => {
  const response = await fetch(`/api/v1/withdraw/ban-list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const result = await response.json();

  if (!response.ok) throw new Error(`${result.message}`);

  return result;
};

export const deleteAdminWithdrawalBanList = async (params: {
  accountNumber: string;
}) => {
  const response = await fetch(
    `/api/v1/withdraw/ban-list/` + params.accountNumber,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) throw new Error(`${result.message}`);

  return result;
};

export const getAdminWithdrawalExport = async (params: {
  type: string;
  dateFilter: {
    start: string;
    end: string;
  };
  page: number;
  limit: number;
}) => {
  const response = await fetch("/api/v1/withdraw/list/export", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const result = await response.json();

  if (!response.ok) throw new Error("Failed to fetch withdrawal export");

  return result as {
    data: WithdrawListExportData[];
    totalCount: number;
  };
};

export const packageForReinvestment = async (params: {
  packageId: string;
  amount: number;
  memberId: string;
  requestId: string;
  status: string;
}) => {
  const response = await fetch(`/api/v1/package/reinvestment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error || "An error occurred while creating the top-up request."
    );
  }

  return response;
};
