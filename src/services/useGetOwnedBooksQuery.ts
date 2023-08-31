import { useQuery } from "@tanstack/react-query";
import { Book } from "../types";
import { getStoredAccessToken } from "../helpers/authHelper";

const useGetOwnedBooksQuery = () => {
  return useQuery<unknown, Error, Book[]>({
    retry: 0,
    queryKey: ["getOwnedBooks"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:8001/api/get-owned-books.php",
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
