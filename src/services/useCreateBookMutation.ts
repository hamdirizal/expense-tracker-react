import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiBaseUrl } from "../constants/general";
import { getStoredAccessToken } from "../helpers/storageHelper";
import { ApiCreateBookPayload, ApiGenericSuccessResponse } from "../types";

const useCreateBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiGenericSuccessResponse, Error, ApiCreateBookPayload>(
    ["createBook"],
    {
      mutationFn: async (args) => {
        const response = await fetch(
          `${ApiBaseUrl}/create-book.php`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getStoredAccessToken(),
            },
            body: JSON.stringify({
              book_title: args.book_title,
            }),
          }
        );

        if (!response.ok) {
          throw new Error((await response.json()).msg);
        }

        return await response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["getOwnedBooks"]);
      },
    }
  );
};

export default useCreateBookMutation;
