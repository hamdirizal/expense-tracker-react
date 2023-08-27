export enum Page {
  DASHBOARD = "Dashboard",
  CREATE_BOOK = "Books",
  LOGIN = "Login",
}

export enum AjaxState {
  IDLE = 1,
  LOADING = 2,
  SUCCESS = 3,
  FAIL = 4,
}

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
