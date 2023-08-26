import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../main";

const useLoginUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(["loginUser"], {
    mutationFn: async (args: { email: string; password: string }) => {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: args.email,
        password: args.password,
      });
      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        throw new Error("User not found");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getAuthUser"]);
    },
  });
};

export default useLoginUserMutation;
