import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { setStoredAccessToken } from "../helpers/storageHelper";
import { ApiGenericSuccessResponse, ApiLoginResponse, ApiRegisterPayload } from "../types";

const useVerifyAccountMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiGenericSuccessResponse, Error, ApiRegisterPayload>(
    ["verifyAccount"],
    {
      mutationFn: async (args) => {
        const response = await fetch(`${ApiBaseUrl}/verify-account.php`, {
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

export default useVerifyAccountMutation;
