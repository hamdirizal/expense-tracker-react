import { AuthUser, SupabaseClient } from "@supabase/supabase-js";
import { AjaxState, Book } from "../types";
import { useContext, useEffect } from "react";
import { SupabaseContext } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { createBook } from "../slices/bookSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useForm } from "react-hook-form";

interface CreateBookPageProps {
  ownedBooks: Book[];
  setOwnedBooks: (books: Book[]) => void;
}

const CreateBookPage = ({ ownedBooks, setOwnedBooks }: CreateBookPageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const supabase = useContext(SupabaseContext);
  const { auth_user } = useSelector((state: RootState) => state.user);
  const { create_book_state } = useSelector((state: RootState) => state.book);

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
    }
  }, [create_book_state]);

  return (
    <>
      <form
        action="#hello"
        onSubmit={handleSubmit((data) => onFormSubmitted(data))}
        className="relative"
      >
        <div>You don't have any book, create a new one</div>
        <input
          type="text"
          placeholder="Book title"
          {...register("title", { required: true })}
        />
        <br />
        <button type="submit">Create book</button>
        {create_book_state === AjaxState.LOADING && (
          <LoadingSpinner isOverlayed={true} />
        )}
      </form>

      <ul>
        {ownedBooks.map((book: Book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </>
  );
};

export default CreateBookPage;
