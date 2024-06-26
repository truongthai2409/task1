import { useMutation } from "@tanstack/react-query";
import { postService } from "../config/services/Table.service"

export const useDeletePost = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return postService.deletePost(id);
    },
  });
};