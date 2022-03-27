import React from "react";
import { useMutation } from "react-query";
import { client } from "../../../lib/reactQuery";
import { MutationConfig } from "../../../types";
import { delSub } from "../api/delSub";

export const useDelSub = (config?: MutationConfig<typeof delSub>) => {
    const { pathname, search } = window.location || {};
  const delSubMutation = useMutation({
    mutationKey: "del_create",
    mutationFn: delSub,
    onSuccess:()=>{
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
  return delSubMutation;
};

//export default useDelSub;
