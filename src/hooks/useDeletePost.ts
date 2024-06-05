import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const path = import.meta.env.VITE_API;
export const useDeletePost = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return deletePost(id);
    },
  });
};

const deletePost = async (id: number) => {
  await axios.delete(`${path}/${id}`);
};
