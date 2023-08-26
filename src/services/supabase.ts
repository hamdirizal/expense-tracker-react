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
  tagTypes: ["AuthUser", "OwnedBooks"],
  endpoints: (builder) => ({
    getAuthUser: builder.query<any, void>({
      providesTags: ["AuthUser"],
      queryFn: async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          throw { error };
        }
        return { data: data.user };
      },
    }),
    loginUser: builder.mutation({
      invalidatesTags: ["AuthUser"],
      queryFn: async (args) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: args.email,
          password: args.password,
        });
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    getOwnedBooks: builder.query<any, void>({
      providesTags: ["OwnedBooks"],
      queryFn: async () => {
        const { data, error } = await supabase.from("books").select("*");
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
    createBook: builder.mutation({
      invalidatesTags: ["OwnedBooks"],
      queryFn: async (args) => {
        const { data, error } = await supabase
          .from("books")
          .insert([{ title: args.title, owner: args.owner }])
          .select();
        if (error) {
          throw { error };
        }
        return { data };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetOwnedBooksQuery,
  useCreateBookMutation,
  useGetAuthUserQuery,
  useLoginUserMutation,
} = supabaseApi;
