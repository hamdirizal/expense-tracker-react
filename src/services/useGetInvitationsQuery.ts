import { useQuery } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { ApiGetInvitationsResponse } from "../types";

const useGetInvitationsQuery = () => {
  return useQuery<string, Error, ApiGetInvitationsResponse>({
    retry: 0,
    queryKey: ["getInvitations"],
    queryFn: async () => {
      const response = await fetch(
        `${ApiBaseUrl}/get-invitations.php`,
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

export default useGetInvitationsQuery;
