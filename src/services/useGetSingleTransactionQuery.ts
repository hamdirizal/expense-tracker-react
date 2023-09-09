import { useQuery } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { Transaction } from "../types";

const useGetSingleTransactionQuery = (transaction_id: number) => {
  return useQuery<number, Error, Transaction>({
    enabled: !!transaction_id,
    retry: 0,
    queryKey: ["getSingleTransaction", transaction_id],
    queryFn: async () => {
      const response = await fetch(
        `${
          ApiBaseUrl
        }/get-transaction.php?id=${transaction_id}`,
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

export default useGetSingleTransactionQuery;
