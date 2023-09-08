import { useQuery } from "@tanstack/react-query";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { Book } from "../types";

const useGetSingleBookQuery = (book_id: number) => {
  return useQuery<number, Error, Book>({
    retry: 0,
    queryKey: ["getSingleBook", book_id],
    enabled: !!book_id,
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/get-book.php?book_id=${book_id}`,
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
