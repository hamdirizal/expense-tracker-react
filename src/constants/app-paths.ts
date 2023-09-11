export const AppPaths = {
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_ACCOUNT: "/verify-account/:token",
  BOOK_SINGLE: "/book/:book_id",
  BOOK_MANAGE: "/book/:book_id/manage",
  SEARCH_TRANSACTIONS: "/book/:book_id/search-transactions",
  ADD_TRANSACTION: "/book/:book_id/add-transaction",
  SINGLE_TRANSACTION: "/book/:book_id/transaction/:transaction_id",
  PROFILE: "/account",
  DASHBOARD: "/dashboard",
  // OLD PATHS
  VIEW_TRANSACTION: "/book/:book_id/transaction/:transaction_id",
  EDIT_TRANSACTION: "/dashboard/edit-transaction/:transaction_id",
  MANAGE_BOOK: "/dashboard/manage-book/:book_id",
};