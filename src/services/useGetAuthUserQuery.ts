import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { User } from "@supabase/supabase-js";

const useGetAuthUserQuery = () => {
  return useQuery<User | null>({
    retry: 0,
    queryKey: ["getAuthUser"],
    queryFn: async () => {
      const { data, error } = await supabaseClient.auth.getUser();
      if (error) {
        return null;
      }
      if (!data) {
        return null;
      }

      return data.user;
    },
  });
};

export default useGetAuthUserQuery;
