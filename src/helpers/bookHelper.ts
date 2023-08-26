import { Book } from "../types";

export const findBookByIdOrUseFirstOne = (books: Book[], id: number) => {
  return books.find((book) => book.id === id) || books[0];
};
