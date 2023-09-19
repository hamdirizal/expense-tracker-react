import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { ApiGenericSuccessResponse } from "../types";

const useRejectInvitationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiGenericSuccessResponse, Error, number>(["rejectInvitation"], {
    mutationFn: async (bookId) => {
      const response = await fetch(`${ApiBaseUrl}/reject-invitation.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getStoredAccessToken(),
        },
        body: JSON.stringify({
          book_id: bookId,
        }),
      });

      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getIncomingInvitations"]);
    },
  });
};

export default useRejectInvitationMutation;
