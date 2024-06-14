import { useMutation } from "@tanstack/react-query";
import { postService } from "../config/services/Table.service"
import { Data } from "@/types/Data";

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: ({id, data}: {id: number, data: Data} ) => {
      return postService.updatePost(id, data);
    },
    onSuccess(data, variables, context) {
      console.log(data, variables, context)
    },
  });
};