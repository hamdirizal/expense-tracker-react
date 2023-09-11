import { useQuery } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { ApiGetRecentTransactionsResponse } from "../types";

const useGetRecentTransactionsQuery = (book_id: number) => {
  return useQuery<number, Error, ApiGetRecentTransactionsResponse>({
    retry: 0,
    queryKey: ["getRecentTransactions", book_id],
    queryFn: async () => {
      const response = await fetch(
        `${ApiBaseUrl}/get-recently-added-transactions.php?book_id=${book_id}`,
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
