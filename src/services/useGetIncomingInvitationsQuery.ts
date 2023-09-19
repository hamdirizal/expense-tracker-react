import { useQuery } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { ApiGetInvitationsResponse } from "../types";

const useGetIncomingInvitationsQuery = () => {
  return useQuery<string, Error, ApiGetInvitationsResponse>({
    retry: 0,
    queryKey: ["getIncomingInvitations"],
    queryFn: async () => {
      const response = await fetch(
        `${ApiBaseUrl}/get-incoming-invitations.php`,
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

export default useGetIncomingInvitationsQuery;
