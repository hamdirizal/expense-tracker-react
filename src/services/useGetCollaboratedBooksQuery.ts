import { useQuery } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { ApiGetCollaboratedBooksResponse } from "../types";

const useGetCollaboratedBooksQuery = () => {
  return useQuery<unknown, Error, ApiGetCollaboratedBooksResponse>({
    retry: 0,
    queryKey: ["getCollaboratedBooks"],
    queryFn: async () => {
      const response = await fetch(`${ApiBaseUrl}/get-collaborated-books.php`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getStoredAccessToken(),
        },
      });

      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }

      return await response.json();
    },
  });
};

export default useGetCollaboratedBooksQuery;
