import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { Book } from "../types";
import { getStoredAccessToken } from "../helpers/authHelper";

const useGetCollaboratedBooksQuery = () => {
  return useQuery<Book[], null>({
    retry: 0,
    queryKey: ["getCollaboratedBooks"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "http://localhost:8001/api/get-collaborated-books.php",
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

export default useGetCollaboratedBooksQuery;
