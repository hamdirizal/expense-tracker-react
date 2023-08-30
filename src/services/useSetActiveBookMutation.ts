import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { UpsertUserConfigMutationPayload } from "../types";
import { getStoredAccessToken } from "../helpers/authHelper";

const useSetActiveBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(["setActiveBook"], {
    retry: 0,
    mutationFn: async (args: any) => {
      console.log('ARGS', args)
      try {
        const response = await fetch(
          "http://localhost:8001/api/set-active-book.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getStoredAccessToken(),
            },
            body: JSON.stringify({
              book_id: args.book_id,
            }),
          }
        );

        return await response.json();
      } catch (error) {
        return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getAuthUser"]);
    },
  });
};

export default useSetActiveBookMutation;
