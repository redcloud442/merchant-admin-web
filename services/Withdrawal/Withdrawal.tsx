import { getTenantAxios } from "@/lib/axios";
import { AdminWithdrawaldata, HeirarchyData } from "@/lib/types";
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
}) => {
  const response = await getTenantAxios(params.companyName).post(
    "/withdraw/list",
    params
  );

  if (response.status !== 200)
    throw new Error("Failed to fetch withdrawal list");

  return response.data as AdminWithdrawaldata;
};
