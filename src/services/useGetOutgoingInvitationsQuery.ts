import { useQuery } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { ApiGetInvitationsResponse } from "../types";

const useGetOutgoingInvitationsQuery = (book_id: number) => {
  return useQuery<string, Error, ApiGetInvitationsResponse>({
    retry: 0,
    queryKey: ["getOutgoingInvitations", book_id],
    queryFn: async () => {
      const response = await fetch(
        `${ApiBaseUrl}/get-outgoing-invitations.php?book_id=${book_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getStoredAccessToken(),
          },
        }
      );

      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }

      return await response.json();
    },
  });
};

export default useGetOutgoingInvitationsQuery;
