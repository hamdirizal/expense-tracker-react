import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { store } from "./store";
import { Provider } from "react-redux";

const supabase: SupabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App supabase={supabase} />
  </Provider>
);
