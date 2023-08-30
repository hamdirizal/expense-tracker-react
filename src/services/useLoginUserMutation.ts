import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { LoginResponse } from "../types";
import { setAccessToken } from "../helpers/authHelper";

const useLoginUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(["loginUser"], {
    mutationFn: async (args: { email: string; password: string }) => {
      try {
        const response = await fetch("http://localhost:8001/api/login.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: args.email,
            password: args.password,
          }),
        });

        const result: LoginResponse = await response.json();

        setAccessToken(result.access_token);

        return result;
      } catch (error) {
        return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getAuthUser"]);
    },
  });
};

export default useLoginUserMutation;
