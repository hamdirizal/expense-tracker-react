import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../main";

const useCreateBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(["loginUser"], {
    mutationFn: async (args: { title: string; owner: string }) => {
      const { data, error } = await supabaseClient
        .from("books")
        .insert([{ title: args.title, owner: args.owner }])
        .select();
      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        throw new Error("User not found");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getOwnedBooks"]);
    },
  });
};

export default useCreateBookMutation;
