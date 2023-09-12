import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { setStoredAccessToken } from "../helpers/storageHelper";
import {
  ApiGenericSuccessResponse,
  ApiLoginPayload,
  ApiLoginResponse,
  ApiRequestPasswordResetPayload,
} from "../types";

const useRequestResetMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiGenericSuccessResponse,
    Error,
    ApiRequestPasswordResetPayload
  >(["requestPasswordReset"], {
    mutationFn: async (args) => {
      const response = await fetch(`${ApiBaseUrl}/request-password-reset.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: args.email,
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
    onSuccess: () => {},
  });
};

export default useRequestResetMutation;
