import {
  company_deposit_request_table,
  company_withdrawal_request_table,
} from "@/generated/companyMithril";

export type TopUpRequestData = company_deposit_request_table & {
  user_username: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  user_id: string;
  approver_username: string;
  company_member_id: string;
  count: number;
  attachment_url: string[];
};

export type AdminTopUpRequestData = {
  data: {
    APPROVED: StatusData;
    REJECTED: StatusData;
    PENDING: StatusData;
  };
  merchantBalance?: number;
  totalPendingDeposit?: number;
  totalApprovedDeposit?: number;
};

export type StatusData = {
  data: TopUpRequestData[];
  count: number;
};

export type WithdrawalRequestData = company_withdrawal_request_table & {
  user_first_name: string;
  user_last_name: string;
  user_id: string;
  user_email: string;
  company_member_id: string;
  approver_username?: string;
};

export type AdminWithdrawaldata = {
  data: {
    APPROVED: StatusDataWithdraw;
    REJECTED: StatusDataWithdraw;
    PENDING: StatusDataWithdraw;
    HOLD: StatusDataWithdraw;
  };
  totalPendingWithdrawal: number;
  totalApprovedWithdrawal: number;
};

export type StatusDataWithdraw = {
  data: WithdrawalRequestData[];
  count: number;
};

export type HeirarchyData = {
  company_member_id: string;
  user_username: string;
  user_id: string;
};

export type WithdrawListExportData = {
  "Requestor Username": string;
  Status: string;
  Amount: number;
  "Bank Account": string;
  "Bank Name": string;
  "Account Number": string;
  "Withdrawal Type": string;
  "Date Created": string;
  "Date Updated": string;
  "Approved By": string;
};

export type CompanyName =
  | "district-1"
  | "warehouse-pal-project"
  | "dispatcher-1"
  | "agri-plus";
