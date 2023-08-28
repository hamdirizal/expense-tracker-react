import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../main";

const useLogoutUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(["logoutUser"], {
    mutationFn: async () => {
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      return { data: true };
    },
    onSettled: () => {
      queryClient.invalidateQueries(["getAuthUser"]);
    },
  });
};

export default useLogoutUserMutation;
