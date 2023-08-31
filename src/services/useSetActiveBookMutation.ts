import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import { UpsertUserConfigMutationPayload } from "../types";
import { getStoredAccessToken } from "../helpers/authHelper";

const useSetActiveBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(["setActiveBook"], {
    retry: 0,
    mutationFn: async (args: any) => {
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
        return true;
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
