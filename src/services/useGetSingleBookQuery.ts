import { useQuery } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { Book } from "../types";

const useGetSingleBookQuery = (book_id: string) => {
  return useQuery<string, Error, Book>({
    retry: 0,
    queryKey: ["getSingleBook", book_id],
    enabled: !!book_id,
    queryFn: async () => {
      const response = await fetch(
        `${ApiBaseUrl}/get-book.php?book_id=${book_id}`,
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

export default useGetSingleBookQuery;
