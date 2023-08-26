import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../main";

const useGetAuthUserQuery = () => {
  return useQuery({
    retry: 0,
    queryKey: ["getAuthUser"],
    queryFn: async () => {
      const { data, error } = await supabaseClient.auth.getUser();
      console.log('GETAUTHUSER SUCCESS', data)
      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        throw new Error("User not found");
      }
  
      return data;
    },
  });
};

export default useGetAuthUserQuery;
