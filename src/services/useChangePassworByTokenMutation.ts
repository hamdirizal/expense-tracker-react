import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { setStoredAccessToken } from "../helpers/storageHelper";
import {
  ApiChangePasswordByTokenPayload,
  ApiGenericSuccessResponse,
  ApiLoginPayload,
  ApiRequestPasswordResetPayload,
} from "../types";

const useChangePasswordByTokenMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiGenericSuccessResponse,
    Error,
    ApiChangePasswordByTokenPayload
  >(["requestPasswordReset"], {
    mutationFn: async (args) => {
      const response = await fetch(`${ApiBaseUrl}/change-password-by-token.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: args.password,
          password: args.confirm_password,
          token: args.token,
        }),
      });
      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }
      return await response.json();
    },
    onSuccess: () => {},
  });
};

export default useChangePasswordByTokenMutation;
