export enum Page {
  DASHBOARD = "Dashboard",
  CREATE_BOOK = "Books",
  LOGIN = "Login",
}

export interface Book {
  created_at: string;
  id: number;
  owner: string;
  title: string;
}
