import { useQuery } from "@tanstack/react-query";
import { Transaction, TxSummary } from "../types";
import { getStoredAccessToken } from "../helpers/storageHelper";

const useGetTransactionSummaryQuery = (book_id: number) => {
  return useQuery<number, Error, TxSummary>({
    retry: 0,
    queryKey: ["getTransactionSummaryQuery", book_id],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:8001/api/get-transaction-summary.php?book_id=" + book_id,
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

export default useGetTransactionSummaryQuery;
