import React from "react";
import { MutationConfig } from "../../../types";
import { createSub } from "../api";
import { useMutation } from "react-query";
import { client } from "../../../lib/reactQuery";

export const useCreateSub = (config?: MutationConfig<typeof createSub>) => {
  const { pathname, search } = window.location || {};
  const createSubMutation = useMutation({
    mutationKey: "create_sub",
    mutationFn: createSub,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [
          "Table",
          { loc: pathname + (search.length === 0 ? "?page=1" : search) },
        ],
        active: true,
      });
    },
    ...config,
  });
  return createSubMutation;
};

//export default useCreateSub
