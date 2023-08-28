import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { UserConfig } from "../types";

const useGetActiveBookQuery = () => {
  return useQuery<UserConfig | null>({
    retry: 0,
    queryKey: ["getUserConfig"],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from("user_configs")
        .select("*, book ( * )")
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

export default useGetActiveBookQuery;
