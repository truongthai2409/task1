import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API as string,
  headers: {
    "Content-Type": "application/json",
  } as RawAxiosRequestHeaders,
});

http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => config
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    // if (response && response.data) {
    //   return response;
    // }

    return response;
  },
  (error: AxiosError) => {
    throw error;
  }
);

export default http;
