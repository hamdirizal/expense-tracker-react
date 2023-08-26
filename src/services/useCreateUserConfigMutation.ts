import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../main";

const useCreateUserConfigMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(["createUserConfig"], {
    retry: 0,
    mutationFn: async (args: { user_id: string }) => {
      const { data, error } = await supabaseClient
        .from("user_configs")
        .insert([{ user_id: args.user_id }])
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

export default useCreateUserConfigMutation;
