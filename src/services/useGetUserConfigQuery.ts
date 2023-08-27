import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../main";

const useGetUserConfigQuery = () => {
  return useQuery({
    retry: 0,
    queryKey: ["getUserConfig"],
    queryFn: async () => {
      // If success return the object, otherwise return null
      const { data, error } = await supabaseClient
        .from("user_configs")
        .select("*")
        .maybeSingle();
      console.log("USERCONFIG DATA", data);
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
