import axios, { AxiosError } from "axios";
import { handleApiError } from "./apiCall";

interface apiProps {
  headers?: Record<string, string>;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  data: any;
}

export const authApiCall = async (props: apiProps) => {
  try {
    const payload = {
      ...props,
      headers: {
        "Content-type": "application/json",
        ...props.headers,
      },
    };
    const res = await axios(payload);
    return res;
  } catch (error) {
    handleApiError(error);
  }
};
