import { Book, Page } from "../types";
import LoadingSpinner from "./LoadingSpinner";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import { useContext } from "react";
import { PageContext } from "../App";
import VarDump from "./VarDump";
import useGetUserConfigQuery from "../services/useGetUserConfigQuery";
import { findBookByIdOrUseFirstOne } from "../helpers/bookHelper";
import { Link } from "react-router-dom";
import { AppPaths } from "../constants";

const CurrentBookPanel = () => {
  const getOwnedBooksQuery = useGetOwnedBooksQuery();
  const getUserConfigQuery = useGetUserConfigQuery();

  const renderInfo = (getOwnedBooksQuery: any) => {
    const has_books: boolean = !!getOwnedBooksQuery?.data?.length;
    const active_book_id: number =
      getUserConfigQuery?.data?.active_book_id || 0;
    if (has_books) {
      // Find active book based on the active_book_id, if not found, use the first book
      const active_book: Book = findBookByIdOrUseFirstOne(
        getOwnedBooksQuery.data,
        active_book_id
      );
      return (
        <div>
          Book: <span className="font-bold">{active_book.title}</span>{" "}
          <Link className="bg-green-300" to={AppPaths.MANAGE_BOOKS}>
            (manage books)
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          Cou don't have any book.{" "}
          <Link className="bg-green-300" to={AppPaths.MANAGE_BOOKS}>
            Create one here
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="border px-2 relative rounded">
      {renderInfo(getOwnedBooksQuery)}
    </div>
  );
};

export default CurrentBookPanel;
