import React from "react";
import { useSelector } from "react-redux";
import { client } from "../../../lib/reactQuery";
import { RootState } from "../../../store";
import { PagingResults, Subscriber } from "../../../types";

export const useGetSub = () => {
  const subState = useSelector((state: RootState) => state.subscriber);
  if (subState.data) {
    const { pathname, search } = window.location || {};
    const subscribers =
      client.getQueryData<PagingResults<Subscriber>>([
        "Table",
        { loc: pathname + (search.length === 0 ? "?page=1" : search) },
      ])?.results || [];
    const subscriber = subscribers.find(
      (subscriber) => subscriber.id === subState.data?.id
    );
    // console.log(subscriber);
    return subscriber!;
  }
  return {
    service_type: "MOBILE_PREPAID",
    owner: {
      name: "",
    },
  } as Subscriber;
};

//export default useGetSub
