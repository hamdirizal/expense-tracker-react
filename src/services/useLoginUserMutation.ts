import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../main";

const useLoginUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(["loginUser"], {
    mutationFn: async (args: { email: string; password: string }) => {
      // If success return the User object, otherwise return null
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: args.email,
        password: args.password,
      });
      if (error) {
        return null;
      }
      if (!data) {
        return null;
      }

      return data.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getAuthUser"]);
    },
  });
};

export default useLoginUserMutation;
