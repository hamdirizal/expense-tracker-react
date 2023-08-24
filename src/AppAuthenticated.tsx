import { AuthUser, SupabaseClient } from "@supabase/supabase-js";

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
  const onLogoutButtonClicked = () => {
    supabase.auth.signOut().then(({ error }) => {
      if (!error) setAuthUser(null);
    });
  };

  return (
    <div>
      <h1>Welcome back {authUser?.email}</h1>
      <div>
        <button onClick={onLogoutButtonClicked}>Logout</button>
      </div>
    </div>
  );
};

export default AppAuthenticated;
