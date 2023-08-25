import { useState, useEffect } from "react";
import { AuthUser, SupabaseClient } from "@supabase/supabase-js";
import AppAnon from "./AppAnon";
import AppAuthenticated from "./AppAuthenticated";

interface AppProps {
  supabase: SupabaseClient;
}

function App({ supabase }: AppProps) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      error ? setAuthUser(null) : setAuthUser(data.user);
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white px-4" data-testid="App">
      {authUser === null ? (
        <AppAnon setAuthUser={setAuthUser} />
      ) : (
        <AppAuthenticated setAuthUser={setAuthUser} authUser={authUser} />
      )}
    </div>
  );
}

export default App;
