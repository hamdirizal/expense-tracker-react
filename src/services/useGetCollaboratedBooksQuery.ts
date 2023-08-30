import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { Book } from "../types";

const useGetCollaboratedBooksQuery = () => {
  return useQuery<Book[], Error>({
    retry: 0,
    queryKey: ["getCollaboratedBooks"],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from("books")
        .select("*")
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

export default useGetCollaboratedBooksQuery;
