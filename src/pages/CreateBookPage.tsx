import { AuthUser, SupabaseClient } from "@supabase/supabase-js";
import { Book } from "../types";
import { BaseSyntheticEvent, useContext } from "react";
import { SupabaseContext } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { createBook } from "../slices/bookSlice";

interface CreateBookPageProps {
  ownedBooks: Book[];
  setOwnedBooks: (books: Book[]) => void;
}

const CreateBookPage = ({ ownedBooks, setOwnedBooks }: CreateBookPageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const supabase = useContext(SupabaseContext);
  const { auth_user } = useSelector((state: RootState) => state.user);
  const handleFormSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (auth_user) {
      dispatch(
        createBook({
          supabase,
          title: e.target.elements.title.value,
          owner: auth_user.id,
        })
      );
    }
  };

  return (
    <>
      <div>You don't have any book, create a new one</div>
      <form action="" onSubmit={handleFormSubmit}>
        <input type="text" name="title" placeholder="Book title" />
        <br />
        <button type="submit">Create book</button>
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
