import { componentSchema } from "@/routes/_auth.components.add/route";
import { z } from "zod";
import { apiCall } from "./apiCall";
import { apiBook } from "@/lib/urls";

export const createComponent = async ({
  auth,
  data,
}: {
  auth: any;
  data: z.infer<typeof componentSchema> & { formattedCode: string };
}) => {
  const res = await apiCall({
    auth,
    method: "POST",
    url: apiBook.ADD_COMPONENT,
    data,
  });
  return res;
};

export const getAllComponents = async ({ auth }: { auth: any }) => {
  const res = await apiCall({
    auth,
    method: "GET",
    url: apiBook.GET_ALL_COMP,
  });
  return res;
};
