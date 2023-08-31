import { useQuery } from "@tanstack/react-query";
import { Transaction } from "../types";
import { getStoredAccessToken } from "../helpers/authHelper";

const useGetRecentTransactionsQuery = (book_id: number) => {
  return useQuery<unknown, Error, Transaction[]>({
    retry: 0,
    queryKey: ["getRecentTransactions", book_id],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:8001/api/get-transactions.php?book_id=" + book_id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getStoredAccessToken(),
          },
        }
      );

      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }
      return await response.json();
    },
  });
};

export default useGetRecentTransactionsQuery;
