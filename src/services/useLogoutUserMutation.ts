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
      console.log('LOGOUT SUCCES')
      queryClient.invalidateQueries(["getAuthUser"]);
      console.log('LOGOUT SUCCES AND INVALIDATING')
    },
  });
};

export default useLogoutUserMutation;
