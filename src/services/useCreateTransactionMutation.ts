import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { getStoredAccessToken } from "../helpers/storageHelper";
import {
  ApiCreateTransactionPayload,
  ApiGenericSuccessResponse,
} from "../types";

const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiGenericSuccessResponse,
    Error,
    ApiCreateTransactionPayload
  >(["createTransaction"], {
    mutationFn: async (args) => {
      const response = await fetch(
        `${ApiBaseUrl}/create-transaction.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getStoredAccessToken(),
          },
          body: JSON.stringify(args),
        }
      );

      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getRecentTransactions"]);
    },
  });
};

export default useCreateTransactionMutation;
