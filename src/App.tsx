import { useState, useEffect } from "react";
import { AuthUser, SupabaseClient } from "@supabase/supabase-js";
import AppAnon from "./AppAnon";
import AppAuthenticated from "./AppAuthenticated";

interface AppProps {
  supabase: SupabaseClient;
}

function App({ supabase }: AppProps) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      error ? setAuthUser(null) : setAuthUser(data.user);
    });
  });

  return (
    <div className="max-w-2xl mx-auto bg-white">
      {authUser === null ? (
        <AppAnon supabase={supabase} setAuthUser={setAuthUser} />
      ) : (
        <AppAuthenticated
          supabase={supabase}
          setAuthUser={setAuthUser}
          authUser={authUser}
        />
      )}
    </div>
  );
}

export default App;
