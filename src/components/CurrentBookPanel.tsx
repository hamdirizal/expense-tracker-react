import { Page } from "../types";
import LoadingSpinner from "./LoadingSpinner";
import usePage from "../hooks/usePage";
import { useGetOwnedBooksQuery } from "../services/supabase";

const CurrentBookPanel = () => {
  const ownedBooks = useGetOwnedBooksQuery();
  const { switchPage } = usePage();

  const renderNoBooks = () => {
    return (
      <div>
        Cou don't have any book.{" "}
        <button
          onClick={() => {
            switchPage(Page.CREATE_BOOK);
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
            switchPage(Page.CREATE_BOOK);
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
      {ownedBooks?.data?.length ? renderHasBooks() : renderNoBooks()}
      {ownedBooks.isLoading && <LoadingSpinner isOverlayed={true} />}
    </div>
  );
};

export default CurrentBookPanel;
