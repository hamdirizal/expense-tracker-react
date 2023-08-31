import { useQuery } from "@tanstack/react-query";
import { Transaction } from "../types";
import { getStoredAccessToken } from "../helpers/authHelper";

const useGetRecentTransactionsQuery = (book_id: number) => {
  return useQuery<Transaction[]>({
    retry: 0,
    enabled: !!book_id,
    queryKey: ["getRecentTransactions", book_id],
    queryFn: async () => {
      try {
        const res = await fetch(
          "http://localhost:8001/api/get-transactions.php?book_id=" + book_id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getStoredAccessToken(),
            }
          }
        );
        const data = await res.json();
        return data;
      } catch (error) {
        return null;
      }
    },
  });
};

export default useGetRecentTransactionsQuery;
