export const ApiBaseUrl = import.meta.env.VITE_API_URL;

export const AppPaths = {
  LOGIN: "/login",
  BOOK_SINGLE: "/book/:book_id",
  BOOK_MANAGE: "/book/:book_id/manage",
  SEARCH_TRANSACTIONS: "/book/:book_id/search-transactions",
  ADD_TRANSACTION: "/book/:book_id/add-transaction",
  VIEW_TRANSACTION: "/book/:book_id/transaction/:transaction_id",
  PROFILE: "/account",
  DASHBOARD: "/dashboard",
  // OLD PATHS
  EDIT_TRANSACTION: "/dashboard/edit-transaction/:transaction_id",
  MANAGE_BOOK: "/dashboard/manage-book/:book_id",
};

export const AppTitle = "Monee";

export const Texts = {
  APP_TITLE: "Monee",
  APP_TAGLINE: "Manage your money",
  BACK_TO_BOOK_SELECTION: "Back to the book selection",
  BACK_TO_THE_BOOK_PAGE: "Back to the book dashboard",
  ADD_TRANSACTION: "Add transaction",
  SEARCH_TRANSACTIONS: "Search transactions",
  LISTING: "Listing",
  SEARCH: "Search",
  MANAGE: "Manage",
  ACTIONS: "Actions",
  SUMMARY: "Summary",
  RECENTLY_ADDED: "Recently added",
  HI_NAME: "Hi, {{name}}",
  TODAY: "Today",
  THIS_MONTH: "This month",
  THIS_WEEK: "This week",
  THIS_YEAR: "This year",
  MY_ACCOUNT: "My account",
  LOGGED_IN_AS: "Logged in as:",
  LOGOUT: "Logout",
  EDIT_BASIC_INFO: "Edit basic info",
  CHANGE_PASSWORD: "Change password",
  DELETE_ACCOUNT: "Delete account",
  LOGIN: "Login",
  EMAIL: "Email",
  PASSWORD: "Password",
  MY_BOOKS: "My books",
  COLLABORATED_BOOKS: "Collaborated books",
  INVITATIONS: "Invitations",
  SUBMIT: "Submit",
  CANCEL: "Cancel",
  INCOMING: "Incoming",
  OUTGOING: "Outgoing",
  COPYRIGHT_NOTES: "© 2014 Monee. All rights reserved.",
  DASHBOARD: "Dashboard",
  CREATE_NEW_BOOK: "Create new book",
  NO_TRANSACTIONS: "No transactions",
  NO_OWNED_BOOKS: "No books. Please create one.",
  NO_COLLABORATED_BOOKS: "No collaborated books",
  NO_INVITATIONS: "No invitations",
  NOT_ALLOWED_TO_EDIT_TRANSACTION: "You are not allowed to edit this transaction",
  OOPS: "Oops!",
  PAGE_NOT_FOUND_MESSAGE: "The page you are looking for does not exist or temporarily unavailable.",
  INPUTLABEL_TYPE: "Type",
  INPUTLABEL_DATE: "Date",
  INPUTLABEL_TITLE: "Title",
  INPUTLABEL_AMOUNT: "Amount",
  INPUTLABEL_DESCRIPTION: "Description",
  INPUTLABEL_CREATEDBY: "Created by",
};
