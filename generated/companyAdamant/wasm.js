
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
  user_phone_number: 'user_phone_number',
  user_profile_picture: 'user_profile_picture',
  user_bot_field: 'user_bot_field'
};

exports.Prisma.User_history_logScalarFieldEnum = {
  user_history_log_id: 'user_history_log_id',
  user_history_log_date_created: 'user_history_log_date_created',
  user_ip_address: 'user_ip_address',
  user_history_user_id: 'user_history_user_id'
};

exports.Prisma.Company_tableScalarFieldEnum = {
  company_id: 'company_id',
  company_name: 'company_name',
  company_date_created: 'company_date_created'
};

exports.Prisma.Company_member_tableScalarFieldEnum = {
  company_member_id: 'company_member_id',
  company_member_role: 'company_member_role',
  company_member_date_created: 'company_member_date_created',
  company_member_company_id: 'company_member_company_id',
  company_member_user_id: 'company_member_user_id',
  company_member_restricted: 'company_member_restricted',
  company_member_date_updated: 'company_member_date_updated',
  company_member_is_active: 'company_member_is_active'
};

exports.Prisma.Company_referral_link_tableScalarFieldEnum = {
  company_referral_link_id: 'company_referral_link_id',
  company_referral_link: 'company_referral_link',
  company_referral_code: 'company_referral_code',
  company_referral_link_member_id: 'company_referral_link_member_id'
};

exports.Prisma.Company_referral_tableScalarFieldEnum = {
  company_referral_id: 'company_referral_id',
  company_referral_date: 'company_referral_date',
  company_referral_hierarchy: 'company_referral_hierarchy',
  company_referral_member_id: 'company_referral_member_id',
  company_referral_link_id: 'company_referral_link_id',
  company_referral_from_member_id: 'company_referral_from_member_id'
};

exports.Prisma.Company_earnings_tableScalarFieldEnum = {
  company_earnings_id: 'company_earnings_id',
  company_member_wallet: 'company_member_wallet',
  company_package_earnings: 'company_package_earnings',
  company_referral_earnings: 'company_referral_earnings',
  company_combined_earnings: 'company_combined_earnings',
  company_earnings_member_id: 'company_earnings_member_id'
};

exports.Prisma.Company_deposit_request_tableScalarFieldEnum = {
  company_deposit_request_id: 'company_deposit_request_id',
  company_deposit_request_amount: 'company_deposit_request_amount',
  company_deposit_request_date: 'company_deposit_request_date',
  company_deposit_request_status: 'company_deposit_request_status',
  company_deposit_request_type: 'company_deposit_request_type',
  company_deposit_request_account: 'company_deposit_request_account',
  company_deposit_request_name: 'company_deposit_request_name',
  company_deposit_request_attachment: 'company_deposit_request_attachment',
  company_deposit_request_reject_note: 'company_deposit_request_reject_note',
  company_deposit_request_member_id: 'company_deposit_request_member_id',
  company_deposit_request_approved_by: 'company_deposit_request_approved_by',
  company_deposit_request_date_updated: 'company_deposit_request_date_updated'
};

exports.Prisma.Company_withdrawal_request_tableScalarFieldEnum = {
  company_withdrawal_request_id: 'company_withdrawal_request_id',
  company_withdrawal_request_amount: 'company_withdrawal_request_amount',
  company_withdrawal_request_fee: 'company_withdrawal_request_fee',
  company_withdrawal_request_withdraw_amount: 'company_withdrawal_request_withdraw_amount',
  company_withdrawal_request_bank_name: 'company_withdrawal_request_bank_name',
  company_withdrawal_request_date: 'company_withdrawal_request_date',
  company_withdrawal_request_status: 'company_withdrawal_request_status',
  company_withdrawal_request_account: 'company_withdrawal_request_account',
  company_withdrawal_request_type: 'company_withdrawal_request_type',
  company_withdrawal_request_withdraw_type: 'company_withdrawal_request_withdraw_type',
  company_withdrawal_request_member_id: 'company_withdrawal_request_member_id',
  company_withdrawal_request_approved_by: 'company_withdrawal_request_approved_by',
  company_withdrawal_request_date_updated: 'company_withdrawal_request_date_updated',
  company_withdrawal_request_reject_note: 'company_withdrawal_request_reject_note'
};

exports.Prisma.Company_transaction_tableScalarFieldEnum = {
  company_transaction_id: 'company_transaction_id',
  company_transaction_date: 'company_transaction_date',
  company_transaction_description: 'company_transaction_description',
  company_transaction_details: 'company_transaction_details',
  company_transaction_amount: 'company_transaction_amount',
  company_transaction_member_id: 'company_transaction_member_id',
  company_transaction_type: 'company_transaction_type',
  company_transaction_attachment: 'company_transaction_attachment'
};

exports.Prisma.Company_hidden_user_tableScalarFieldEnum = {
  company_hidden_user_id: 'company_hidden_user_id',
  company_hidden_user_date: 'company_hidden_user_date',
  company_hidden_user_member_id: 'company_hidden_user_member_id',
  company_hidden_user_action_by: 'company_hidden_user_action_by'
};

exports.Prisma.Company_promo_tableScalarFieldEnum = {
  company_promo_id: 'company_promo_id',
  company_promo_image: 'company_promo_image'
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

exports.Prisma.Package_member_connection_tableScalarFieldEnum = {
  package_member_connection_id: 'package_member_connection_id',
  package_member_package_id: 'package_member_package_id',
  package_member_member_id: 'package_member_member_id',
  package_member_connection_created: 'package_member_connection_created',
  package_member_amount: 'package_member_amount',
  package_amount_earnings: 'package_amount_earnings',
  package_member_status: 'package_member_status',
  package_member_is_ready_to_claim: 'package_member_is_ready_to_claim',
  package_member_completion_date: 'package_member_completion_date',
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

exports.Prisma.Merchant_tableScalarFieldEnum = {
  merchant_id: 'merchant_id',
  merchant_date_created: 'merchant_date_created',
  merchant_account_name: 'merchant_account_name',
  merchant_account_number: 'merchant_account_number',
  merchant_account_type: 'merchant_account_type',
  merchant_qr_attachment: 'merchant_qr_attachment'
};

exports.Prisma.Merchant_balance_logScalarFieldEnum = {
  merchant_balance_log_id: 'merchant_balance_log_id',
  merchant_balance_log_date: 'merchant_balance_log_date',
  merchant_balance_log_amount: 'merchant_balance_log_amount',
  merchant_balance_log_user: 'merchant_balance_log_user'
};

exports.Prisma.Merchant_member_tableScalarFieldEnum = {
  merchant_member_id: 'merchant_member_id',
  merchant_member_date_created: 'merchant_member_date_created',
  merchant_member_merchant_id: 'merchant_member_merchant_id',
  merchant_member_balance: 'merchant_member_balance'
};

exports.Prisma.Error_tableScalarFieldEnum = {
  error_id: 'error_id',
  error_message: 'error_message',
  error_stack_trace: 'error_stack_trace',
  error_stack_path: 'error_stack_path',
  error_function_name: 'error_function_name',
  error_date_created: 'error_date_created'
};

exports.Prisma.Dashboard_earnings_summaryScalarFieldEnum = {
  member_id: 'member_id',
  total_earnings: 'total_earnings',
  total_withdrawals: 'total_withdrawals',
  package_income: 'package_income',
  direct_referral_amount: 'direct_referral_amount',
  indirect_referral_amount: 'indirect_referral_amount',
  direct_referral_count: 'direct_referral_count',
  indirect_referral_count: 'indirect_referral_count'
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
  ACCOUNTING_HEAD: 'ACCOUNTING_HEAD'
};

exports.Prisma.ModelName = {
  user_table: 'user_table',
  user_history_log: 'user_history_log',
  company_table: 'company_table',
  company_member_table: 'company_member_table',
  company_referral_link_table: 'company_referral_link_table',
  company_referral_table: 'company_referral_table',
  company_earnings_table: 'company_earnings_table',
  company_deposit_request_table: 'company_deposit_request_table',
  company_withdrawal_request_table: 'company_withdrawal_request_table',
  company_transaction_table: 'company_transaction_table',
  company_hidden_user_table: 'company_hidden_user_table',
  company_promo_table: 'company_promo_table',
  package_table: 'package_table',
  package_member_connection_table: 'package_member_connection_table',
  package_earnings_log: 'package_earnings_log',
  package_ally_bounty_log: 'package_ally_bounty_log',
  merchant_table: 'merchant_table',
  merchant_balance_log: 'merchant_balance_log',
  merchant_member_table: 'merchant_member_table',
  error_table: 'error_table',
  dashboard_earnings_summary: 'dashboard_earnings_summary'
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
