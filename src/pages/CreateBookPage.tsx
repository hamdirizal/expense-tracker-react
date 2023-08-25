import { AuthUser, SupabaseClient } from "@supabase/supabase-js";
import { Book } from "../types";
import { BaseSyntheticEvent, useContext } from "react";

interface CreateBookPageProps {
  ownedBooks: Book[];
  supabase: SupabaseClient;
  setOwnedBooks: (books: Book[]) => void;
  authUser: AuthUser;
}

const CreateBookPage = ({
  ownedBooks,
  supabase,
  setOwnedBooks,
  authUser,
}: CreateBookPageProps) => {
  const handleFormSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    supabase
      .from("books")
      .insert([{ title: e.target.elements.title.value, owner: authUser.id }])
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
