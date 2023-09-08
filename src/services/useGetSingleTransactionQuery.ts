import { useQuery } from "@tanstack/react-query";
import { Transaction } from "../types";
import { getStoredAccessToken } from "../helpers/storageHelper";

const useGetSingleTransactionQuery = (transaction_id: number) => {
  return useQuery<number, Error, Transaction>({
    enabled: !!transaction_id,
    retry: 0,
    queryKey: ["getSingleTransaction", transaction_id],
    queryFn: async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
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
