import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "../main";
import {
  ApiGenericSuccessResponse,
  ApiSetActiveBookPayload,
  UpsertUserConfigMutationPayload,
} from "../types";
import { getStoredAccessToken } from "../helpers/authHelper";

const useSetActiveBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiGenericSuccessResponse,
    Error,
    ApiSetActiveBookPayload,
    unknown
  >(["setActiveBook"], {
    retry: 0,
    mutationFn: async (args) => {
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
      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }
      const successData = await response.json();
      return successData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getAuthUser"]);
    },
  });
};

export default useSetActiveBookMutation;
