import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { setStoredAccessToken } from "../helpers/storageHelper";
import { ApiGenericSuccessResponse, ApiLoginResponse, ApiRegisterPayload } from "../types";

const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiGenericSuccessResponse, Error, ApiRegisterPayload>(
    ["registerUser"],
    {
      mutationFn: async (args) => {
        const response = await fetch(`${ApiBaseUrl}/register.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: args.email,
            password: args.password,
            confirm_password: args.confirm_password,
            nickname: args.nickname,
          }),
        });
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
    }
  );
};

export default useRegisterMutation;
