import { AuthUser, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Book } from "./types";
import CreateBookPage from "./pages/CreateBookPage";

interface AppAuthenticatedProps {
  supabase: SupabaseClient;
  authUser: AuthUser | null;
  setAuthUser: (user: any) => void;
}

const AppAuthenticated = ({
  supabase,
  authUser,
  setAuthUser,
}: AppAuthenticatedProps) => {
  const [ownedBooks, setOwnedBooks] = useState<Book[]>([]);

  useEffect(() => {
    supabase
      .from("books")
      .select("*")
      .then(({ data, error }) => {
        if (!error) setOwnedBooks(data || []);
      });
  }, []);

  const onLogoutButtonClicked = () => {
    supabase.auth.signOut().then(({ error }) => {
      if (!error) setAuthUser(null);
    });
  };

  return (
    <div>
      <h1>Welcome back {authUser?.email}</h1>
      <button onClick={onLogoutButtonClicked}>Logout</button>
      <hr />
      <CreateBookPage
        ownedBooks={ownedBooks}
        supabase={supabase}
        setOwnedBooks={setOwnedBooks}
        authUser={authUser}
      />
    </div>
  );
};

export default AppAuthenticated;
