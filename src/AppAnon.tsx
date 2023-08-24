import { useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { BaseSyntheticEvent, useContext } from "react";

interface AppAnonProps {
  setAuthUser: (user: unknown) => void;
  supabase: SupabaseClient;
}

const AppAnon = ({ setAuthUser, supabase }: AppAnonProps) => {
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
        }
        else{
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
