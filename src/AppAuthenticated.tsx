import { AuthUser, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState, useContext } from "react";
import { Book } from "./types";
import CreateBookPage from "./pages/CreateBookPage";
import { useDispatch, useSelector } from "react-redux";
import { getOwnedBooks } from "./slices/bookSlice";
import { AppDispatch } from "./store";
import { SupabaseContext } from "./main";
import { userLogout } from "./slices/userSlice";

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
    dispatch(userLogout({ supabase }));
  };

  return (
    <div>
      <h1>Welcome back {authUser?.email}</h1>
      <button onClick={onLogoutButtonClicked}>Logout</button>
      <hr />
      <CreateBookPage
        ownedBooks={ownedBooks}
        setOwnedBooks={setOwnedBooks}
      />
    </div>
  );
};

export default AppAuthenticated;
