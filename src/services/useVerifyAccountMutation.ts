import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { setStoredAccessToken } from "../helpers/storageHelper";
import { ApiGenericSuccessResponse, ApiVerifyAccount } from "../types";

const useVerifyAccountMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiGenericSuccessResponse, Error, ApiVerifyAccount>(
    ["verifyAccount"],
    {
      mutationFn: async (args) => {
        const response = await fetch(`${ApiBaseUrl}/verify-account.php?token=${args.token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
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
