import { Page } from "../types";
import LoadingSpinner from "./LoadingSpinner";
import usePage from "../hooks/usePage";
import useGetOwnedBooksQuery from "../services/useGetOwnedBooksQuery";
import { useContext } from "react";
import { PageContext } from "../App";

const CurrentBookPanel = () => {
  const ownedBooksState = useGetOwnedBooksQuery();
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const renderNoBooks = () => {
    return (
      <div>
        Cou don't have any book.{" "}
        <button
          onClick={() => {
            setCurrentPage(Page.CREATE_BOOK);
          }}
          className=" bg-green-300"
        >
          Create one here
        </button>
      </div>
    );
  };

  const renderHasBooks = () => {
    return (
      <div>
        Book: Catatan rumah{" "}
        <button
          onClick={() => {
            setCurrentPage(Page.CREATE_BOOK);
          }}
          className=" bg-green-300"
        >
          (manage)
        </button>
      </div>
    );
  };

  return (
    <div className="border px-2 relative rounded">
      {ownedBooksState?.data?.length ? renderHasBooks() : renderNoBooks()}
      {ownedBooksState.isLoading && <LoadingSpinner isOverlayed={true} />}
    </div>
  );
};

export default CurrentBookPanel;
