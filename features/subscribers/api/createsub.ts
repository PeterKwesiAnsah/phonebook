import { fetchAsync } from "../../../lib/axios";

export type subPayload = {
  id?: number;
  name: string;
  msisdn: string;
  service_type: "MOBILE_POSTPAID" | "MOBILE_PREPAID";
};

export const createSub = (payload: subPayload) => {
  return fetchAsync({
    path: !!payload.id ? "/subscriber/" + payload.id : "/subscriber/",
    method: !!payload.id ? "PATCH" : "POST",
    data: payload,
  });
};
