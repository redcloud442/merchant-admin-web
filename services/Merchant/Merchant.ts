import { merchant_table } from "@/generated/companyPr1me";
import { getTenantAxios } from "@/lib/axios";

export const getMerchantData = async (params: {
  page: number;
  limit: number;
  companyName: string;
}) => {
  const response = await getTenantAxios(params.companyName).post(
    "/merchant/bank",
    params
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch merchant data");
  }

  return response.data.data as {
    data: merchant_table[];
    totalCount: number;
  };
};

export const handleCreateMerchantData = async (params: {
  accountNumber: string;
  accountType: string;
  accountName: string;
  merchantQrAttachment: string;
  companyName: string;
}) => {
  const response = await getTenantAxios(params.companyName).post(
    "/merchant",
    params
  );

  if (response.status !== 200) {
    throw new Error("An error occurred while creating the merchant.");
  }

  return response.data as {
    data: merchant_table;
  };
};

export const handleUpdateMerchantData = async (params: {
  merchantId: string;
  companyName: string;
}) => {
  const response = await getTenantAxios(params.companyName).delete(`/merchant`);

  if (response.status !== 200) {
    throw new Error("An error occurred while updating the merchant.");
  }

  return response;
};
