import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../main";

const useGetOwnedBooksQuery = () => {
  return useQuery({
    retry: 0,
    queryKey: ["getOwnedBooks"],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from("books")
        .select("*")
        .order("id", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        throw new Error("Failed to fetch books");
      }

      return data;
    },
  });
};

export default useGetOwnedBooksQuery;
