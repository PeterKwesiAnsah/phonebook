import React from "react";
import { fetchAsync } from "../../../lib/axios";

export const getAllSubs = () =>
  fetchAsync({
    method: "GET",
    path: "/subscriber/?page_size=1",
  });
