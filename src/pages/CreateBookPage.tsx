import { AuthUser, SupabaseClient } from "@supabase/supabase-js";
import { Book } from "../types";
import { BaseSyntheticEvent, useContext } from "react";
import { SupabaseContext } from "../main";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface CreateBookPageProps {
  ownedBooks: Book[];
  setOwnedBooks: (books: Book[]) => void;
  authUser: AuthUser;
}

const CreateBookPage = ({ ownedBooks, setOwnedBooks }: CreateBookPageProps) => {
  const supabase = useContext(SupabaseContext);
  const { auth_user } = useSelector((state: RootState) => state.user);
  const handleFormSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    supabase
      .from("books")
      .insert([{ title: e.target.elements.title.value, owner: auth_user?.id }])
      .select()
      .then(({ data, error }) => {
        console.log("DATA", data);
        console.log("ERROR", error);
      });
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
