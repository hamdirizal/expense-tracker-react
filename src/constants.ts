/*
Url scheme:
/login
/book
  Without any id, we show message that no book is selected
  Then allow user to pick a default book. Once user picks a default book, we store it in local storage and redirect to /book/:book_id
/book/:book_id
  If user has access to this book, show the dashboard info for this book
/book/:book_id/manage
  For book owner. Use this url for book management. Like editing book title, adding collaborators etc.
  For book collaborator. Use this url to see the book info. Like book title, owner. And other collaborators.
/book/:book_id/transactions
  Show all transactions for this book. Paginated results. 
/book/:book_id/transaction/:transaction_id
  Show details of this transaction. Allow editing this transaction.
/book/:book_id/add-transaction
/book/:book_id/search-transactions
  Search transactions for this book. Paginated results.



*/

export const AppPaths = {
  LOGIN: "/login",
  BOOK_SINGLE: "/book/:book_id",
  BOOK_MANAGE: "/book/:book_id/manage",
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
  LOGGED_IN_AS: "Logged in as {{email}}",
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
};
