// import { IPostData, Posts } from "./../types/posts.type";
// import { POST_API } from "../config/path";
// import http from "../utils/http";
import HTTP from "../api/apiConfig";
import { Data } from "../../types/Data";
// import axios, { AxiosResponse } from "axios";

const PATH = import.meta.env.VITE_API;

export const postService = {
  async getPost() {
    return HTTP.get<Data>(PATH);
  },
  addPost(post: Omit<Data, "id">) {
    return HTTP.post<Data>(`${PATH}`, post);
  },
  getPosts(id: number | string) {
    return HTTP.get<Data>(`${PATH}/${id}`);
  },
  updatePost(id: number | string, post: Data) {
    return HTTP.put<Data>(`${PATH}/${id}`, post);
  },
  deletePost(id: number | string) {
    return HTTP.delete(`${PATH}/${id}`);
  },
};
