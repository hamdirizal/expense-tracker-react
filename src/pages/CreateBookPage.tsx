import { AuthUser, SupabaseClient } from "@supabase/supabase-js";
import { AjaxState, Book } from "../types";
import { useContext, useEffect } from "react";
import { SupabaseContext } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { createBook, getOwnedBooks } from "../slices/bookSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useForm } from "react-hook-form";
import PageTitle from "../components/PageTitle";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";

interface CreateBookPageProps {
  ownedBooks: Book[];
  setOwnedBooks: (books: Book[]) => void;
}

const CreateBookPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const supabase = useContext(SupabaseContext);
  const { auth_user } = useSelector((state: RootState) => state.user);
  const { create_book_state, owned_books, get_owned_books_state } = useSelector(
    (state: RootState) => state.book
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onFormSubmitted = (data: any) => {
    if (auth_user) {
      dispatch(
        createBook({
          supabase,
          title: data.title,
          owner: auth_user.id,
        })
      );
    }
  };

  useEffect(() => {
    if (create_book_state === AjaxState.SUCCESS) {
      setValue("title", "");
      dispatch(getOwnedBooks(supabase));
    }
  }, [create_book_state]);

  return (
    <>
      <PageTitle title="Manage books" />
      <form
        action="#hello"
        onSubmit={handleSubmit((data) => onFormSubmitted(data))}
        className="relative"
      >
        <div>Create new book</div>
        <div className="flex">
          <input
            className="border-2 border-gray-400 mr-3"
            required
            type="text"
            placeholder="Book title"
            {...register("title", { required: true })}
          />
          <div className="w-[200px]">
            <Button
              label="Create book"
              variant="primary"
              onClick={() => {}}
              type={"submit"}
            />
          </div>
        </div>

        {create_book_state === AjaxState.LOADING && (
          <LoadingSpinner isOverlayed={true} />
        )}
      </form>

      <hr />

      <div className="relative">
        <SectionTitle title="Owned books" />
        <ul>
          {owned_books.map((book: Book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
        {get_owned_books_state === AjaxState.LOADING && (
          <LoadingSpinner isOverlayed={true} />
        )}
      </div>
      <SectionTitle title="Collaborated books" />
      <ul>
        <li>first</li>
        <li>Second</li>
        <li>Third</li>
      </ul>
    </>
  );
};

export default CreateBookPage;
