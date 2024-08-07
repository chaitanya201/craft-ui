import axios, { AxiosError } from "axios";

interface apiProps {
  auth: any;
  headers?: Record<string, string>;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  data?: any;
}

export const apiCall = async (props: apiProps) => {
  try {
    const payload = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": "",
        ...props.headers,
      },
    };
    const res = await axios(payload);
    return res;
  } catch (error) {
    handleApiError(error);
  }
};

const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    throw new Error(error.message);
  } else if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error("Something went wrong.");
  }
};
