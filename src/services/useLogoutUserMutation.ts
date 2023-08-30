import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { purgeStoredAccessToken } from "../helpers/authHelper";

const useLogoutUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(["logoutUser"], {
    mutationFn: async () => {
      purgeStoredAccessToken();
      return null;
    },
    onSettled: () => {
      queryClient.invalidateQueries(["getAuthUser"]);
    },
  });
};

export default useLogoutUserMutation;
