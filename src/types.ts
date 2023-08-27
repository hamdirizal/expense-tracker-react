export enum Page {
  DASHBOARD = "Dashboard",
  MANAGE_BOOKS = "Manage Books",
  LOGIN = "Login",
  ADD_TRANSACTION = "Add Transaction",
  EDIT_TRANSACTION = "Edit Transaction",
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
