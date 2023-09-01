import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiCreateBookPayload, ApiGenericSuccessResponse } from "../types";
import { getStoredAccessToken } from "../helpers/authHelper";

const useCreateBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiGenericSuccessResponse, Error, ApiCreateBookPayload>(
    ["createBook"],
    {
      mutationFn: async (args) => {
        const response = await fetch(
          "http://localhost:8001/api/create-book.php",
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
