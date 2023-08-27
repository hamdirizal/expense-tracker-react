import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../main";

const useGetAuthUserQuery = () => {
  return useQuery({
    retry: 0,
    queryKey: ["getAuthUser"],
    queryFn: async () => {
      // If success return the User object, otherwise return null
      const { data, error } = await supabaseClient.auth.getUser();
      if (error) {
        return null
      }
      if (!data) {
        return null
      }
  
      return data.user;
    },
  });
};

export default useGetAuthUserQuery;
