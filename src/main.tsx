import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Provider } from "react-redux";
import { createContext, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const supabase: SupabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const supabaseClient: SupabaseClient = supabase;

export const SupabaseContext = createContext(supabase);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SupabaseContext.Provider value={supabase}>
    <QueryClientProvider client={queryClient}>
      <App supabase={supabase} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </SupabaseContext.Provider>
);
