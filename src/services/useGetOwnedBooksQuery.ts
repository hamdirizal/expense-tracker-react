import { useQuery } from "@tanstack/react-query";

import { getStoredAccessToken } from "../helpers/storageHelper";
import { Book } from "../types";

const useGetOwnedBooksQuery = () => {
  return useQuery<unknown, Error, Book[]>({
    retry: 0,
    queryKey: ["getOwnedBooks"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/get-owned-books.php`,
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

export default useGetOwnedBooksQuery;
