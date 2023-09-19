import { useQuery } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { ApiGetCollaboratorsResponse } from "../types";

const useGetCollaboratorsQuery = (book_id: number) => {
  return useQuery<number, Error, ApiGetCollaboratorsResponse>({
    retry: 0,
    queryKey: ["getCollaborators", book_id],
    queryFn: async () => {
      const response = await fetch(
        `${ApiBaseUrl}/get-collaborators.php?book_id=${book_id}`,
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

export default useGetCollaboratorsQuery;
