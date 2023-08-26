import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../main";

const useGetUserConfigQuery = () => {
  return useQuery({
    retry: 0,
    queryKey: ["getUserConfig"],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from("user_configs")
        .select("*")
        .maybeSingle();
      console.log("USERCONFIG DATA", data);
      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        throw new Error("Operation failed");
      }

      return data;
    },
  });
};

export default useGetUserConfigQuery;
