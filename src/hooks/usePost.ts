// import React from 'react'

import { useQuery } from "@tanstack/react-query";
import { postService } from "../config/services/Table.service";

const usePost = () => {
  return useQuery({
    queryKey: ["repoData"],
    queryFn: () => postService.getPost().then(response => {
      return response;
    })
    .catch(error => {
      return error;
    }),

  })
};

export default usePost;
