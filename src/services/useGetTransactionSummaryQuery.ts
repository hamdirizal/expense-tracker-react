import { useQuery } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { TxSummary } from "../types";

const useGetTransactionSummaryQuery = (book_id: number) => {
  return useQuery<number, Error, TxSummary>({
    retry: 0,
    queryKey: ["getTransactionSummaryQuery", book_id],
    queryFn: async () => {
      const response = await fetch(
        `${ApiBaseUrl}/get-transaction-summary.php?book_id=${book_id}`,
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
