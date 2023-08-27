import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { Transaction } from "../types";

const useGetRecentTransactionsQuery = (book_id: number) => {
  return useQuery<Transaction[]>({
    retry: 0,
    enabled: !!book_id,
    queryKey: ["getRecentTransactions", book_id],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("*")
        .limit(10)
        .eq("book_id", book_id)
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

export default useGetRecentTransactionsQuery;
