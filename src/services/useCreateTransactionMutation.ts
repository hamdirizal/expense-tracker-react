import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ApiCreateTransactionPayload,
  ApiGenericSuccessResponse,
} from "../types";
import { getStoredAccessToken } from "../helpers/storageHelper";

const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiGenericSuccessResponse,
    Error,
    ApiCreateTransactionPayload
  >(["createTransaction"], {
    mutationFn: async (args) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-transaction.php`,
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
