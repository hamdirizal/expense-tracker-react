export interface Book {
  created_at: string;
  id: number;
  owner_id: string;
  title: string;
}

export interface UpsertUserConfigMutationPayload {
  user_id: string;
  active_book_id?: number;
}
