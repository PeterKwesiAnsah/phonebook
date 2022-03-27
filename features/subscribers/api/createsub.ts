import { fetchAsync } from "../../../lib/axios";

export type subPayload = {
  name: string;
  msisdn: string;
  service_type: "MOBILE_POSTPAID" | "MOBILE_PREPAID";
};

export const createSub = (payload: subPayload) => {
  return fetchAsync({
    path: "/subscriber",
    method: "POST",
    data: payload,
  });
};
