import { useQuery } from "@tanstack/react-query";
import { Transaction } from "../types";
import { getStoredAccessToken } from "../helpers/authHelper";

const useGetSingleTransactionQuery = (transaction_id: number) => {
  return useQuery<number, Error, Transaction>({
    enabled: !!transaction_id,
    retry: 0,
    queryKey: ["getSingleTransaction", transaction_id],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:8001/api/get-transaction.php?id=" + transaction_id,
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
