import axios, { AxiosRequestConfig } from "axios";

interface axiosProps {
  path: string;
  data?: {};
  contentType?: string;
  params?: {};
  headers?: {};
  method:
    | "get"
    | "GET"
    | "delete"
    | "DELETE"
    | "head"
    | "HEAD"
    | "options"
    | "OPTIONS"
    | "post"
    | "POST"
    | "put"
    | "PUT"
    | "patch"
    | "PATCH"
    | "link"
    | "LINK"
    | "unlink"
    | "UNLINK"
    | undefined;
  noHeaders?: boolean;
}

interface Config extends AxiosRequestConfig {
  contentType?: string;
  data?: {};
  json: boolean;
}

export type headerType = {
  Authorization: string;
  "Content-Type": string;
};

export const fetchAsync = async ({
  path,
  noHeaders,
  data,
  ...rest
}: axiosProps) => {
  const hostname = window.location.origin + "/api";
  const url = `${hostname}${path}`;
  const axiosData: Config = {
    ...rest,
    data,
    json: true,
    url,
    headers: {
      "Content-Type": "application/json",
    },
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
  };
  const payload = await axios(axiosData);
  return payload.data;
};
