import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { Book } from "../types";
import { getStoredAccessToken } from "../helpers/authHelper";

const useGetOwnedBooksQuery = () => {
  return useQuery<Book[], Error>({
    retry: 0,
    queryKey: ["getOwnedBooks"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "http://localhost:8001/api/get-owned-books.php",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getStoredAccessToken(),
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (error) {
        return null;
      }
    },
  });
};

export default useGetOwnedBooksQuery;
