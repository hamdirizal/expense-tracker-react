import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { SupabaseContext } from "../main";
import { useContext } from "react";
import { AjaxState, Page } from "../types";
import LoadingSpinner from "./LoadingSpinner";
import usePage from "../hooks/usePage";
import { useGetOwnedBooksQuery } from "../services/book";

const CurrentBookPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const supabase = useContext(SupabaseContext);
  const { data, error, isLoading } = useGetOwnedBooksQuery();
  const { create_book_state, owned_books, get_owned_books_state } = useSelector(
    (state: RootState) => state.book
  );
  const { switchPage } = usePage();

  const renderNoBooks = () => {
    return <div>Cou don't have any book. Create one here.</div>;
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
      <div className="border mb-2">{JSON.stringify(data)}</div>
      <div className="border mb-2">{JSON.stringify(isLoading)}</div>
      {owned_books.length ? renderHasBooks() : renderNoBooks()}

      {create_book_state === AjaxState.LOADING && (
        <LoadingSpinner isOverlayed={true} />
      )}
    </div>
  );
};

export default CurrentBookPanel;
