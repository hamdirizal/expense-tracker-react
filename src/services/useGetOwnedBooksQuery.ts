import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { Book } from "../types";

const useGetOwnedBooksQuery = () => {
  return useQuery<Book[], Error>({
    retry: 0,
    queryKey: ["getOwnedBooks"],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from("books")
        .select("*, books_collaborators( * )")
        .order("id", { ascending: false });
      if (error) {
        return [];
      }
      if (!data) {
        return [];
      }

      return data;
    },
  });
};

export default useGetOwnedBooksQuery;
