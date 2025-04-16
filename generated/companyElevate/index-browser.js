
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.5.0
 * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
 */
Prisma.prismaVersion = {
  client: "6.5.0",
  engine: "173f8d54f8d52e692c7e27e72a88314ec7aeff60"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.User_tableScalarFieldEnum = {
  user_id: 'user_id',
  user_date_created: 'user_date_created',
  user_username: 'user_username',
  user_first_name: 'user_first_name',
  user_last_name: 'user_last_name',
  user_email: 'user_email',
  user_password: 'user_password',
  user_active_mobile: 'user_active_mobile',
  user_profile_picture: 'user_profile_picture',
  user_bot_field: 'user_bot_field'
};

exports.Prisma.User_history_logScalarFieldEnum = {
  user_history_log_id: 'user_history_log_id',
  user_history_log_date_created: 'user_history_log_date_created',
  user_ip_address: 'user_ip_address',
  user_history_user_id: 'user_history_user_id'
};

exports.Prisma.Alliance_tableScalarFieldEnum = {
  alliance_id: 'alliance_id',
  alliance_name: 'alliance_name',
  alliance_date_created: 'alliance_date_created'
};

exports.Prisma.Alliance_member_tableScalarFieldEnum = {
  alliance_member_id: 'alliance_member_id',
  alliance_member_role: 'alliance_member_role',
  alliance_member_date_created: 'alliance_member_date_created',
  alliance_member_alliance_id: 'alliance_member_alliance_id',
  alliance_member_user_id: 'alliance_member_user_id',
  alliance_member_restricted: 'alliance_member_restricted',
  alliance_member_date_updated: 'alliance_member_date_updated',
  alliance_member_is_active: 'alliance_member_is_active'
};

exports.Prisma.Alliance_referral_link_tableScalarFieldEnum = {
  alliance_referral_link_id: 'alliance_referral_link_id',
  alliance_referral_link: 'alliance_referral_link',
  alliance_referral_link_member_id: 'alliance_referral_link_member_id'
};

exports.Prisma.Alliance_referral_tableScalarFieldEnum = {
  alliance_referral_id: 'alliance_referral_id',
  alliance_referral_date: 'alliance_referral_date',
  alliance_referral_hierarchy: 'alliance_referral_hierarchy',
  alliance_referral_member_id: 'alliance_referral_member_id',
  alliance_referral_link_id: 'alliance_referral_link_id',
  alliance_referral_from_member_id: 'alliance_referral_from_member_id'
};

exports.Prisma.Dashboard_earnings_summaryScalarFieldEnum = {
  member_id: 'member_id',
  total_earnings: 'total_earnings',
  total_withdrawals: 'total_withdrawals',
  direct_referral_amount: 'direct_referral_amount',
  indirect_referral_amount: 'indirect_referral_amount',
  direct_referral_count: 'direct_referral_count',
  package_income: 'package_income'
};

exports.Prisma.Alliance_preferred_withdrawal_tableScalarFieldEnum = {
  alliance_preferred_withdrawal_id: 'alliance_preferred_withdrawal_id',
  alliance_preferred_withdrawal_account_name: 'alliance_preferred_withdrawal_account_name',
  alliance_preferred_withdrawal_account_number: 'alliance_preferred_withdrawal_account_number',
  alliance_preferred_withdrawal_bank_name: 'alliance_preferred_withdrawal_bank_name',
  alliance_preferred_withdrawal_member_id: 'alliance_preferred_withdrawal_member_id'
};

exports.Prisma.Alliance_ranking_tableScalarFieldEnum = {
  alliance_ranking_id: 'alliance_ranking_id',
  alliance_rank: 'alliance_rank',
  alliance_total_income_tag: 'alliance_total_income_tag',
  alliance_ranking_member_id: 'alliance_ranking_member_id'
};

exports.Prisma.Alliance_earnings_tableScalarFieldEnum = {
  alliance_earnings_id: 'alliance_earnings_id',
  alliance_olympus_wallet: 'alliance_olympus_wallet',
  alliance_olympus_earnings: 'alliance_olympus_earnings',
  alliance_referral_bounty: 'alliance_referral_bounty',
  alliance_combined_earnings: 'alliance_combined_earnings',
  alliance_earnings_member_id: 'alliance_earnings_member_id'
};

exports.Prisma.Alliance_top_up_request_tableScalarFieldEnum = {
  alliance_top_up_request_id: 'alliance_top_up_request_id',
  alliance_top_up_request_amount: 'alliance_top_up_request_amount',
  alliance_top_up_request_date: 'alliance_top_up_request_date',
  alliance_top_up_request_status: 'alliance_top_up_request_status',
  alliance_top_up_request_type: 'alliance_top_up_request_type',
  alliance_top_up_request_bank_name: 'alliance_top_up_request_bank_name',
  alliance_top_up_request_account: 'alliance_top_up_request_account',
  alliance_top_up_request_name: 'alliance_top_up_request_name',
  alliance_top_up_request_attachment: 'alliance_top_up_request_attachment',
  alliance_top_up_request_reject_note: 'alliance_top_up_request_reject_note',
  alliance_top_up_request_member_id: 'alliance_top_up_request_member_id',
  alliance_top_up_request_approved_by: 'alliance_top_up_request_approved_by',
  alliance_top_up_request_date_updated: 'alliance_top_up_request_date_updated',
  alliance_top_up_request_receipt: 'alliance_top_up_request_receipt'
};

exports.Prisma.Alliance_top_up_request_attachment_tableScalarFieldEnum = {
  alliance_top_up_request_attachment_id: 'alliance_top_up_request_attachment_id',
  alliance_top_up_request_attachment_date: 'alliance_top_up_request_attachment_date',
  alliance_top_up_request_attachment_url: 'alliance_top_up_request_attachment_url',
  alliance_top_up_request_attachment_request_id: 'alliance_top_up_request_attachment_request_id'
};

exports.Prisma.Alliance_withdrawal_request_tableScalarFieldEnum = {
  alliance_withdrawal_request_id: 'alliance_withdrawal_request_id',
  alliance_withdrawal_request_amount: 'alliance_withdrawal_request_amount',
  alliance_withdrawal_request_fee: 'alliance_withdrawal_request_fee',
  alliance_withdrawal_request_withdraw_amount: 'alliance_withdrawal_request_withdraw_amount',
  alliance_withdrawal_request_referral_amount: 'alliance_withdrawal_request_referral_amount',
  alliance_withdrawal_request_earnings_amount: 'alliance_withdrawal_request_earnings_amount',
  alliance_withdrawal_request_bank_name: 'alliance_withdrawal_request_bank_name',
  alliance_withdrawal_request_email: 'alliance_withdrawal_request_email',
  alliance_withdrawal_request_cellphone_number: 'alliance_withdrawal_request_cellphone_number',
  alliance_withdrawal_request_date: 'alliance_withdrawal_request_date',
  alliance_withdrawal_request_date_updated: 'alliance_withdrawal_request_date_updated',
  alliance_withdrawal_request_status: 'alliance_withdrawal_request_status',
  alliance_withdrawal_request_account: 'alliance_withdrawal_request_account',
  alliance_withdrawal_request_type: 'alliance_withdrawal_request_type',
  alliance_withdrawal_request_withdraw_type: 'alliance_withdrawal_request_withdraw_type',
  alliance_withdrawal_request_member_id: 'alliance_withdrawal_request_member_id',
  alliance_withdrawal_request_approved_by: 'alliance_withdrawal_request_approved_by',
  alliance_withdrawal_request_reject_note: 'alliance_withdrawal_request_reject_note'
};

exports.Prisma.Alliance_mission_tableScalarFieldEnum = {
  alliance_mission_id: 'alliance_mission_id',
  alliance_mission_name: 'alliance_mission_name',
  alliance_mission_order: 'alliance_mission_order',
  alliance_mission_is_active: 'alliance_mission_is_active',
  alliance_mission_reward: 'alliance_mission_reward'
};

exports.Prisma.Alliance_mission_task_tableScalarFieldEnum = {
  alliance_mission_task_id: 'alliance_mission_task_id',
  alliance_mission_id: 'alliance_mission_id',
  alliance_mission_task_name: 'alliance_mission_task_name',
  alliance_mission_task_target: 'alliance_mission_task_target',
  alliance_mission_task_type: 'alliance_mission_task_type'
};

exports.Prisma.Alliance_mission_progress_tableScalarFieldEnum = {
  alliance_mission_progress_id: 'alliance_mission_progress_id',
  alliance_member_id: 'alliance_member_id',
  alliance_mission_id: 'alliance_mission_id',
  is_completed: 'is_completed',
  reward_claimed: 'reward_claimed',
  completed_at: 'completed_at',
  alliance_mission_progress_created: 'alliance_mission_progress_created'
};

exports.Prisma.Alliance_mission_progress_taskScalarFieldEnum = {
  alliance_mission_progress_id: 'alliance_mission_progress_id',
  alliance_mission_task_id: 'alliance_mission_task_id'
};

exports.Prisma.Alliance_mission_task_progress_tableScalarFieldEnum = {
  alliance_mission_task_progress_id: 'alliance_mission_task_progress_id',
  alliance_member_id: 'alliance_member_id',
  alliance_mission_task_id: 'alliance_mission_task_id',
  progress_count: 'progress_count',
  is_completed: 'is_completed',
  completed_at: 'completed_at'
};

exports.Prisma.Alliance_transaction_tableScalarFieldEnum = {
  transaction_id: 'transaction_id',
  transaction_date: 'transaction_date',
  transaction_description: 'transaction_description',
  transaction_amount: 'transaction_amount',
  transaction_member_id: 'transaction_member_id'
};

exports.Prisma.Package_tableScalarFieldEnum = {
  package_id: 'package_id',
  package_name: 'package_name',
  package_description: 'package_description',
  package_percentage: 'package_percentage',
  packages_days: 'packages_days',
  package_is_disabled: 'package_is_disabled',
  package_color: 'package_color',
  package_image: 'package_image'
};

exports.Prisma.Package_notification_tableScalarFieldEnum = {
  package_notification_id: 'package_notification_id',
  package_notification_created_at: 'package_notification_created_at',
  package_notification_message: 'package_notification_message'
};

exports.Prisma.Package_member_connection_tableScalarFieldEnum = {
  package_member_connection_id: 'package_member_connection_id',
  package_member_package_id: 'package_member_package_id',
  package_member_member_id: 'package_member_member_id',
  package_member_connection_created: 'package_member_connection_created',
  package_member_amount: 'package_member_amount',
  package_amount_earnings: 'package_amount_earnings',
  package_member_status: 'package_member_status',
  package_member_completion_date: 'package_member_completion_date',
  package_member_is_ready_to_claim: 'package_member_is_ready_to_claim',
  package_member_is_notified: 'package_member_is_notified',
  package_member_is_reinvestment: 'package_member_is_reinvestment'
};

exports.Prisma.Package_earnings_logScalarFieldEnum = {
  package_earnings_log_id: 'package_earnings_log_id',
  package_member_connection_id: 'package_member_connection_id',
  package_member_package_id: 'package_member_package_id',
  package_member_member_id: 'package_member_member_id',
  package_member_connection_created: 'package_member_connection_created',
  package_member_amount: 'package_member_amount',
  package_member_amount_earnings: 'package_member_amount_earnings',
  package_member_status: 'package_member_status',
  package_member_connection_date_claimed: 'package_member_connection_date_claimed'
};

exports.Prisma.Package_ally_bounty_logScalarFieldEnum = {
  package_ally_bounty_log_id: 'package_ally_bounty_log_id',
  package_ally_bounty_log_date_created: 'package_ally_bounty_log_date_created',
  package_ally_bounty_member_id: 'package_ally_bounty_member_id',
  package_ally_bounty_percentage: 'package_ally_bounty_percentage',
  package_ally_bounty_earnings: 'package_ally_bounty_earnings',
  package_ally_bounty_type: 'package_ally_bounty_type',
  package_ally_bounty_connection_id: 'package_ally_bounty_connection_id',
  package_ally_bounty_from: 'package_ally_bounty_from'
};

exports.Prisma.Package_notification_logsScalarFieldEnum = {
  package_notification_logs_id: 'package_notification_logs_id',
  package_notification_logs_date: 'package_notification_logs_date'
};

exports.Prisma.Merchant_tableScalarFieldEnum = {
  merchant_id: 'merchant_id',
  merchant_date_created: 'merchant_date_created',
  merchant_account_name: 'merchant_account_name',
  merchant_account_number: 'merchant_account_number',
  merchant_account_type: 'merchant_account_type'
};

exports.Prisma.Merchant_member_tableScalarFieldEnum = {
  merchant_member_id: 'merchant_member_id',
  merchant_member_date_created: 'merchant_member_date_created',
  merchant_member_merchant_id: 'merchant_member_merchant_id',
  merchant_member_balance: 'merchant_member_balance'
};

exports.Prisma.Merchant_balance_logScalarFieldEnum = {
  merchant_balance_log_id: 'merchant_balance_log_id',
  merchant_balance_log_date: 'merchant_balance_log_date',
  merchant_balance_log_amount: 'merchant_balance_log_amount',
  merchant_balance_log_user: 'merchant_balance_log_user'
};

exports.Prisma.Error_tableScalarFieldEnum = {
  error_id: 'error_id',
  error_message: 'error_message',
  error_stack_trace: 'error_stack_trace',
  error_stack_path: 'error_stack_path',
  error_function_name: 'error_function_name',
  error_date_created: 'error_date_created'
};

exports.Prisma.Alliance_notification_tableScalarFieldEnum = {
  alliance_notification_id: 'alliance_notification_id',
  alliance_notification_message: 'alliance_notification_message',
  alliance_notification_date_created: 'alliance_notification_date_created',
  alliance_notification_user_id: 'alliance_notification_user_id',
  alliance_notification_is_read: 'alliance_notification_is_read'
};

exports.Prisma.Chat_session_tableScalarFieldEnum = {
  chat_session_id: 'chat_session_id',
  chat_session_date: 'chat_session_date',
  chat_session_alliance_member_id: 'chat_session_alliance_member_id',
  chat_session_status: 'chat_session_status',
  chat_session_support_id: 'chat_session_support_id'
};

exports.Prisma.Chat_message_tableScalarFieldEnum = {
  chat_message_id: 'chat_message_id',
  chat_message_date: 'chat_message_date',
  chat_message_content: 'chat_message_content',
  chat_message_session_id: 'chat_message_session_id',
  chat_message_alliance_member_id: 'chat_message_alliance_member_id',
  chat_message_sender_user: 'chat_message_sender_user'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN',
  MERCHANT: 'MERCHANT',
  ACCOUNTING: 'ACCOUNTING',
  ACCOUNTING_HEAD: 'ACCOUNTING_HEAD',
  CLIENT: 'CLIENT'
};

exports.Prisma.ModelName = {
  user_table: 'user_table',
  user_history_log: 'user_history_log',
  alliance_table: 'alliance_table',
  alliance_member_table: 'alliance_member_table',
  alliance_referral_link_table: 'alliance_referral_link_table',
  alliance_referral_table: 'alliance_referral_table',
  dashboard_earnings_summary: 'dashboard_earnings_summary',
  alliance_preferred_withdrawal_table: 'alliance_preferred_withdrawal_table',
  alliance_ranking_table: 'alliance_ranking_table',
  alliance_earnings_table: 'alliance_earnings_table',
  alliance_top_up_request_table: 'alliance_top_up_request_table',
  alliance_top_up_request_attachment_table: 'alliance_top_up_request_attachment_table',
  alliance_withdrawal_request_table: 'alliance_withdrawal_request_table',
  alliance_mission_table: 'alliance_mission_table',
  alliance_mission_task_table: 'alliance_mission_task_table',
  alliance_mission_progress_table: 'alliance_mission_progress_table',
  alliance_mission_progress_task: 'alliance_mission_progress_task',
  alliance_mission_task_progress_table: 'alliance_mission_task_progress_table',
  alliance_transaction_table: 'alliance_transaction_table',
  package_table: 'package_table',
  package_notification_table: 'package_notification_table',
  package_member_connection_table: 'package_member_connection_table',
  package_earnings_log: 'package_earnings_log',
  package_ally_bounty_log: 'package_ally_bounty_log',
  package_notification_logs: 'package_notification_logs',
  merchant_table: 'merchant_table',
  merchant_member_table: 'merchant_member_table',
  merchant_balance_log: 'merchant_balance_log',
  error_table: 'error_table',
  alliance_notification_table: 'alliance_notification_table',
  chat_session_table: 'chat_session_table',
  chat_message_table: 'chat_message_table'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
