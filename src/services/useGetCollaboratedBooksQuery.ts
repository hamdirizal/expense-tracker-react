import { useQuery } from "@tanstack/react-query";
import { Book } from "../types";
import { getStoredAccessToken } from "../helpers/storageHelper";

const useGetCollaboratedBooksQuery = () => {
  return useQuery<unknown, Error, Book[]>({
    retry: 0,
    queryKey: ["getCollaboratedBooks"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/get-collaborated-books.php`,
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

export default useGetCollaboratedBooksQuery;
