import { useState, useContext, BaseSyntheticEvent } from "react";
import { AuthUser, SupabaseClient } from "@supabase/supabase-js";
import { SupabaseContext } from "./main";

interface AppAnonProps {
  setAuthUser: (user: AuthUser | null) => void;
}

const AppAnon = ({ setAuthUser }: AppAnonProps) => {
  const supabase = useContext(SupabaseContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    supabase.auth
      .signInWithPassword({
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
      })
      .then(({ data, error }) => {
        if (error) {
          setErrorMessage(error.message);
        } else {
          setAuthUser(data.user);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} action="">
      <h1>Please login</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div>
        <input name="email" type="text" placeholder="Email" />
      </div>
      <div>
        <input name="password" type="text" placeholder="Password" />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default AppAnon;
