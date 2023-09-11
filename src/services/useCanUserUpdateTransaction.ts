import { useQuery } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants";
import { getStoredAccessToken } from "../helpers/storageHelper";

const useCanUserUpdateTransaction = (transaction_id: number) => {
  return useQuery<number, Error, boolean>({
    enabled: !!transaction_id,
    retry: 0,
    queryKey: ["canUserUpdateTransaction", transaction_id],
    queryFn: async () => {
      const response = await fetch(
        `${
          ApiBaseUrl
        }/can-user-update-transaction.php?id=${transaction_id}`,
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

export default useCanUserUpdateTransaction;
