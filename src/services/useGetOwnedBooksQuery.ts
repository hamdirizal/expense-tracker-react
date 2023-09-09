import { useQuery } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { ApiGetOwnedBooksResponse } from "../types";

const useGetOwnedBooksQuery = () => {
  return useQuery<unknown, Error, ApiGetOwnedBooksResponse>({
    retry: 0,
    queryKey: ["getOwnedBooks"],
    queryFn: async () => {
      const response = await fetch(`${ApiBaseUrl}/get-owned-books.php`, {
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

export default useGetOwnedBooksQuery;
