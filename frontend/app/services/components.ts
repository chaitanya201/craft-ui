import { componentSchema } from "@/routes/_auth.components.add/route";
import { z } from "zod";
import { apiCall } from "./apiCall";
import { apiBook } from "@/lib/urls";

export const createComponent = async ({
  auth,
  data,
}: {
  auth: any;
  data: z.infer<typeof componentSchema>;
}) => {
  console.log({ data });
  const res = await apiCall({
    auth,
    method: "POST",
    url: apiBook.ADD_COMPONENT,
    data,
  });
  return res;
};

export const getAllComponents = async ({
  auth,
  componentId,
}: {
  auth: any;
  componentId?: string | undefined;
}) => {
  const url = new URL(apiBook.GET_ALL_COMP);
  if (componentId) {
    url.searchParams.set("componentId", componentId);
  }
  const res = await apiCall({
    auth,
    method: "GET",
    url: url.toString(),
  });
  return res;
};
export const searchComponent = async ({
  auth,
  searchText,
}: {
  auth: any;
  searchText: string;
}) => {
  const url = new URL(apiBook.SEARCH_COMP);
  url.searchParams.set("searchText", searchText);

  const res = await apiCall({
    auth,
    method: "GET",
    url: url.toString(),
  });
  return res;
};
