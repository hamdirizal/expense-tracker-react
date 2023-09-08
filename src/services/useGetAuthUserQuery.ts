import { useQuery } from "@tanstack/react-query";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { User } from "../types";

const useGetAuthUserQuery = () => {
  return useQuery<unknown, Error, User>({
    retry: 0,
    queryKey: ["getAuthUser"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/get-my-info.php`,
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

export default useGetAuthUserQuery;
