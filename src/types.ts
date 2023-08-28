export interface Book {
  created_at: string;
  id: number;
  owner_id: string;
  title: string;
}

export interface Transaction {
  id: number;
  amount: number;
  book_id: number;
  created_at: string;
  creator_id: string;
  date: string;
  description: string | null;
  is_outgoing: boolean | null;
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
}
