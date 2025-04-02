import {
  alliance_top_up_request_table,
  alliance_withdrawal_request_table,
} from "@/generated/companyPr1me";

export type TopUpRequestData = alliance_top_up_request_table & {
  user_username: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  user_id: string;
  approver_username: string;
  alliance_member_id: string;
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
};

export type StatusData = {
  data: TopUpRequestData[];
  count: number;
};

export type WithdrawalRequestData = alliance_withdrawal_request_table & {
  user_first_name: string;
  user_last_name: string;
  user_id: string;
  user_email: string;
  alliance_member_id: string;
  approver_username?: string;
};

export type AdminWithdrawaldata = {
  data: {
    APPROVED: StatusDataWithdraw;
    REJECTED: StatusDataWithdraw;
    PENDING: StatusDataWithdraw;
  };
  totalWithdrawals?: {
    amount: number;
    approvedAmount: number;
  };
};

export type StatusDataWithdraw = {
  data: WithdrawalRequestData[];
  count: number;
};

export type HeirarchyData = {
  alliance_member_id: string;
  user_username: string;
  user_id: string;
};
