import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { UpsertUserConfigMutationPayload } from "../types";

const useUpsertUserConfigMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(["upsertUserConfig"], {
    retry: 0,
    mutationFn: async (args: UpsertUserConfigMutationPayload) => {
      const { data, error } = await supabaseClient
        .from("user_configs")
        .upsert(args)
        .select();
      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        throw new Error("Operation failed");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getUserConfig"]);
    },
  });
};

export default useUpsertUserConfigMutation;
