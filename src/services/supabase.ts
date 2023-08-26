import {
  createApi,
  fetchBaseQuery,
  fakeBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Book } from "../types";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../main";

// Define a service using a base URL and expected endpoints
export const supabaseApi = createApi({
  reducerPath: "supabaseApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getOwnedBooks: builder.query<any, void>({
      queryFn: async () => {
        const { data, error } = await supabase.from("books").select("*");
        return { data };
        // if (error) {
        //   throw { error: "hello" };
        // }

        // return { data };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetOwnedBooksQuery } = supabaseApi;
