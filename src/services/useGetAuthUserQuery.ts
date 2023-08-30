import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { User } from "@supabase/supabase-js";
import { getStoredAccessToken } from "../helpers/authHelper";

const useGetAuthUserQuery = () => {  
  return useQuery<User | null>({
    retry: 0,
    queryKey: ["getAuthUser"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:8001/api/get-my-info.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getStoredAccessToken(),
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        return null;
      }
    },
  });
};

export default useGetAuthUserQuery;
