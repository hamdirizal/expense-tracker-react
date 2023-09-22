import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { ApiGenericSuccessResponse, ApiInviteSomeonePayload } from "../types";

const useInviteSomeoneMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiGenericSuccessResponse, Error, ApiInviteSomeonePayload>(
    ["inviteSomeone"],
    {
      mutationFn: async (args) => {
        const response = await fetch(`${ApiBaseUrl}/invite.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getStoredAccessToken(),
          },
          body: JSON.stringify({
            book_id: args.book_uid,
            email: args.email,
          }),
        });

        if (!response.ok) {
          throw new Error((await response.json()).msg);
        }

        return await response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["getOutgoingInvitations"]);
      },
    }
  );
};

export default useInviteSomeoneMutation;
