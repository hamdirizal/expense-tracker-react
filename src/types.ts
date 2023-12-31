export interface Book {
  uid: number;
  title: string;
  owner_uid: string;
  owner_email: string;
  owner_nickname?: string;
}

export interface Invitation {
  book_uid: number;
  book_title: string;
  owner_email: string;
  owner_nickname?: string;
  target_email: string;
}

export interface Transaction {
  uid: number;
  title: string;
  amount: number;
  book_uid: number;
  tx_date: string;
  description: string | null;
  is_outgoing: boolean;
}
export interface TransactionWithCreator extends Transaction {
  creator_uid: string;
  creator_email: string;
  creator_nickname?: string;
}

export interface CreateTransactionMutationPayload {
  amount: number;
  book_uid: number;
  creator_uid: string;
  date: string;
  description?: string;
  is_outgoing: boolean;
  title: string;
}

export interface UpsertUserConfigMutationPayload {
  user_uid: string;
  active_book_uid?: number;
}

export interface UserConfig {
  user_uid: string;
  active_book_uid: number;
  active_book?: Book | null;
  nickname: string | null;
}

export interface TxSummary {
  today_income: number;
  today_outgoing: number;
  this_month_income: number;
  this_month_outgoing: number;
  this_year_income: number;
  this_year_outgoing: number;
}

export interface User {
  uid: string;
  email: string;
  nickname: string | null;
  is_verified: boolean;
}

export interface SvgIconProps {
  color: string;
}

//@deprecated
export interface LoginResponse {
  access_token: string;
}

export interface ApiLoginResponse {
  access_token: string;
}

interface PaginatedResponse {
  next_page: number | null;
  prev_page: number | null;
}

export interface ApiGetOwnedBooksResponse extends PaginatedResponse {
  results: Book[];
}

export type ApiGetCollaboratedBooksResponse = ApiGetOwnedBooksResponse;

export interface ApiGetRecentTransactionsResponse extends PaginatedResponse {
  results: Transaction[];
}

export interface ApiGetCollaboratorsResponse extends PaginatedResponse {
  results: User[];
}

export interface ApiGetInvitationsResponse extends PaginatedResponse {
  results: Invitation[];
}

export interface ApiGenericSuccessResponse {
  msg: string;
}

export interface ApiLoginPayload {
  email: string;
  password: string;
}

export interface ApiInviteSomeonePayload {
  book_uid: number;
  email: string;
}

export interface ApiRequestPasswordResetPayload {
  email: string;
}

export interface ApiChangePasswordByTokenPayload {
  password: string;
  confirm_password: string;
  token: string;
}

export interface ApiRegisterPayload {
  email: string;
  password: string;
  confirm_password: string;
  nickname: string;
}

export interface ApiVerifyAccount {
  token: string;
}

export interface ApiSetActiveBookPayload {
  book_uid: number;
}

export interface ApiCreateBookPayload {
  book_title: string;
}

export interface ApiCreateBookResponse {
  foo: string;
}

export interface ApiCreateTransactionPayload {
  book_uid: number;
  tx_date: string;
  title: string;
  amount: number;
  is_outgoing: boolean;
  description?: string;
}

export interface ApiGetTransactionPayload extends Transaction {}
