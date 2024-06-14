import { useMutation } from "@tanstack/react-query";
import { postService } from "../config/services/Table.service"

export const useGetPost = () => {
  return useMutation({
    mutationFn: () => {
      return postService.getPost();
    },
  });
};