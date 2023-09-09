import { useMutation, useQueryClient } from "@tanstack/react-query";

import { setStoredAccessToken } from "../helpers/storageHelper";
import { ApiLoginPayload, ApiLoginResponse } from "../types";

const useLoginUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiLoginResponse, Error, ApiLoginPayload>(["loginUser"], {
    mutationFn: async (args) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/login.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: args.email,
            password: args.password,
          }),
        }
      );
      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }
      const successData = await response.json();
      if (successData.access_token) {
        setStoredAccessToken(successData.access_token);
      }
      return successData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getAuthUser"]);
    },
  });
};

export default useLoginUserMutation;
