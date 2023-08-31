import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { ApiLoginPayload, ApiLoginResponse } from "../types";
import { setAccessToken } from "../helpers/authHelper";

const useLoginUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiLoginResponse,
    Error,
    ApiLoginPayload,
    unknown
  >(["loginUser"], {
    mutationFn: async (args) => {
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
      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }
      const successData = await response.json();
      if(successData.access_token) {
        setAccessToken(successData.access_token);
      }
      return successData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getAuthUser"]);
    },
  });
};

export default useLoginUserMutation;
