import { getTenantAxios } from "@/lib/axios";
import { AdminTopUpRequestData } from "@/lib/types";

export const getAdminTopUpRequest = async (
  params: {
    page: number;
    limit: number;
    search?: string;
    columnAccessor: string;
    isAscendingSort: boolean;
    merchantFilter?: string;
    userFilter?: string;
    statusFilter?: string;
    dateFilter?: {
      start: string | undefined;
      end: string | undefined;
    };
  },
  companyName: string
) => {
  const response = await getTenantAxios(companyName).post(
    `/deposit/list`,
    params
  );

  if (response.status !== 200) {
    throw new Error(response.data.error);
  }
  return response.data as AdminTopUpRequestData;
};

export const updateTopUpStatus = async (
  params: {
    status: string;
    requestId: string;
    note?: string;
  },
  companyName: string
) => {
  const { requestId } = params;

  const response = await getTenantAxios(companyName).put(
    `/deposit/` + requestId,
    params
  );

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  return response.data as {
    updatedRequest: {
      company_deposit_request_id: string;
      company_deposit_request_amount: number;
      company_deposit_request_attachment_urls: string[];
      company_member_requestor: {
        company_member_user_id: string;
      };
    };
  };
};
