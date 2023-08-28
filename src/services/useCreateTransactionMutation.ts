import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { CreateTransactionMutationPayload } from "../types";

const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(["createTransaction"], {
    mutationFn: async (args: CreateTransactionMutationPayload) => {
      const { data, error } = await supabaseClient
        .from("transactions")
        .insert([{ ...args }])
        .select();
      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        throw new Error("Cannot create transaction");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getRecentTransactions"]);
    },
  });
};

export default useCreateTransactionMutation;
