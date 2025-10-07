"use client";

import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import api from "./axios";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export function useApi() {
  const router = useRouter();

  const apiRequest = async (
    url: string,
    method: HttpMethod,
    data?: any,
    config: any = {},
  ): Promise<AxiosResponse> => {
    try {
      let response: AxiosResponse;

      switch (method) {
        case "get":
        case "delete":
          response = await api[method](url, config);
          break;
        case "post":
        case "put":
          response = await api[method](url, data, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      return response;
    } catch (error: any) {
      if (error.response?.status === 401 || Number(error) === 401) {
        router.push("/user/login");
      }
      return Promise.reject();
    }
  };

  return { api: apiRequest };
}
