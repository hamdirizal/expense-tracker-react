export interface Book {
  created_at: string;
  id: number;
  owner_id: string;
  title: string;
}

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  book_id: number;
  created_at: string;
  creator_id: string;
  date: string;
  description: string | null;
  is_outgoing: "yes" | "no";
}

export interface CreateTransactionMutationPayload {
  amount: number;
  book_id: number;
  creator_id: string;
  date: string;
  description?: string;
  is_outgoing: "yes" | "no";
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

export interface LoginResponse {
  access_token: string;
}

export interface User {
  active_book: Book | null;
  active_book_id: number | null;
  created_at: string;
  email: string;
  id: string;
  nickname: string | null;
}