import { useState, useEffect } from "react";
import { AuthUser, SupabaseClient } from "@supabase/supabase-js";
import AppAnon from "./AppAnon";
import AppAuthenticated from "./AppAuthenticated";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "./slices/userSlice";
import { AppDispatch, RootState } from "./store";

interface AppProps {
  supabase: SupabaseClient;
}

function App({ supabase }: AppProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [books, setBooks] = useState<any[]>([]);
  const { auth_user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getAuthUser(supabase));
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white px-4" data-testid="App">
      {auth_user === null ? (
        <AppAnon setAuthUser={() => {}} />
      ) : (
        <AppAuthenticated setAuthUser={() => {}} authUser={auth_user} />
      )}
    </div>
  );
}

export default App;
