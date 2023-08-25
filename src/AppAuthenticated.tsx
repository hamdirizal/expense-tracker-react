import { AuthUser, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState, useContext } from "react";
import { Book } from "./types";
import CreateBookPage from "./pages/CreateBookPage";
import { useDispatch, useSelector } from "react-redux";
import { getOwnedBooks } from "./slices/bookSlice";
import { AppDispatch } from "./store";
import { SupabaseContext } from "./main";

interface AppAuthenticatedProps {
  authUser: AuthUser | null;
  setAuthUser: (user: any) => void;
}

const AppAuthenticated = ({ authUser, setAuthUser }: AppAuthenticatedProps) => {
  const supabase = useContext(SupabaseContext);
  const [ownedBooks, setOwnedBooks] = useState<Book[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getOwnedBooks(supabase));
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
        setOwnedBooks={setOwnedBooks}
        authUser={authUser}
      />
    </div>
  );
};

export default AppAuthenticated;
