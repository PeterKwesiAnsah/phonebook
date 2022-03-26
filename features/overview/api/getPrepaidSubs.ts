import React from "react";
import { fetchAsync } from "../../../lib/axios";

export const getPrePaidSubs = () =>
  fetchAsync({
    method: "GET",
    path: "/subscriber/?page_size=1&service_type=MOBILE_PREPAID",
  });
