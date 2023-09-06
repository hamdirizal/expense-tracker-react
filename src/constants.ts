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
  BOOK_WELCOME: "/book",
  BOOK_DASHBOARD: "/book/:book_id",
  BOOK_MANAGE: "/book/:book_id/manage",
  ADD_TRANSACTION: "/book/:book_id/add-transaction",
  VIEW_TRANSACTION: "/book/:book_id/transaction/:transaction_id",
  // OLD PATHS
  DASHBOARD: "/dashboard",
  EDIT_TRANSACTION: "/dashboard/edit-transaction/:transaction_id",
  MANAGE_BOOK: "/dashboard/manage-book/:book_id",
};

export const AppTitle = "Monee";


