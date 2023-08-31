import { useQuery } from "@tanstack/react-query";
import { getStoredAccessToken } from "../helpers/authHelper";
import { User } from "../types";

const useGetAuthUserQuery = () => {
  return useQuery<unknown, Error, User>({
    retry: 0,
    queryKey: ["getAuthUser"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:8001/api/get-my-info.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getStoredAccessToken(),
          },
        });
        const data = await res.json();

        return data?.id ? data : null;
      } catch (error) {
        return null;
      }
    },
  });
};

export default useGetAuthUserQuery;
