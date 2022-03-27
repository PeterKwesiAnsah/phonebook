import React from "react";
import { fetchAsync } from "../../../lib/axios";
type subID = number;
export const delSub = (payload: subID) => {
  return fetchAsync({
    method: "DELETE",
    path: "/subscriber/" + payload,
  });
};

//export default delSub
