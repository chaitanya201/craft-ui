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
    const { auth, ...rest } = props;
    const payload = {
      ...rest,
      headers: {
        "Content-type": "application/json",
        "x-auth-token": auth.token,
        ...props.headers,
      },
    };
    const res = await axios(payload);
    return res;
  } catch (error) {
    handleApiError(error);
  }
};

export const handleApiError = (error: unknown) => {
  console.log("error", error);
  if (error instanceof AxiosError) {
    if (error?.response?.status === 401) {
      window.location.href = "/logout";
      throw new Error(error.response?.data?.data?.message);
    }
    throw new Error(error.message);
  } else if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error("Something went wrong.");
  }
};
