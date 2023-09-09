export interface Book {
  id: number;
  title: string;
  created_at: string;
  owner_id: string;
  owner_email: string;
  owner_nickname?: string;
}

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  book_id: number;
  created_at: string;
  creator_id: string;
  creator_email: string;
  creator_nickname?: string;
  tx_date: string;
  description: string | null;
  is_outgoing: boolean;
  is_editable?: boolean;
}

export interface CreateTransactionMutationPayload {
  amount: number;
  book_id: number;
  creator_id: string;
  date: string;
  description?: string;
  is_outgoing: boolean;
  title: string;
}

export interface UpsertUserConfigMutationPayload {
  user_id: string;
  active_book_id?: number;
}

export interface UserConfig {
  user_id: string;
  active_book_id: number;
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
  active_book: Book | null;
  active_book_id: number | null;
  created_at: string;
  email: string;
  id: string;
  nickname: string | null;
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

export interface ApiGenericSuccessResponse {
  msg: string;
}

export interface ApiLoginPayload {
  email: string;
  password: string;
}

export interface ApiSetActiveBookPayload {
  book_id: number;
}

export interface ApiCreateBookPayload {
  book_title: string;
}

export interface ApiCreateBookResponse {
  foo: string;
}

export interface ApiCreateTransactionPayload {
  book_id: number;
  tx_date: string;
  title: string;
  amount: number;
  is_outgoing: boolean;
  description?: string;
}

export interface ApiGetTransactionPayload extends Transaction {}
