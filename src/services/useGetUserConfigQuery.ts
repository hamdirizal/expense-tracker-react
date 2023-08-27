import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { UserConfig } from "../types";

const useGetUserConfigQuery = () => {
  return useQuery<UserConfig>({
    retry: 0,
    queryKey: ["getUserConfig"],
    queryFn: async () => {
      // If success return the object, otherwise return null
      const { data, error } = await supabaseClient
        .from("user_configs")
        .select("*")
        .maybeSingle();
      if (error) {
        return null;
      }
      if (!data) {
        return null;
      }

      return data;
    },
  });
};

export default useGetUserConfigQuery;
