import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiGenericSuccessResponse, ApiSetActiveBookPayload } from "../types";
import { getStoredAccessToken } from "../helpers/storageHelper";

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
        `${import.meta.env.VITE_API_URL}/set-active-book.php`,
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
      return await response.json();
    },
    onSuccess: () => {
      // queryClient.invalidateQueries(["getAuthUser"]);
      // queryClient.invalidateQueries(["getRecentTransactions"]);
      queryClient.invalidateQueries({
        queryKey: ["getRecentTransactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAuthUser"],
      });
    },
  });
};

export default useSetActiveBookMutation;
