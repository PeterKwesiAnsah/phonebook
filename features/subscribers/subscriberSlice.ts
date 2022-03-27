import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SubscriberState = {
  open: boolean;
  method: "POST" | "PATCH" | "DELETE";
  data?: {
    id: number;
  };
};

const initialState: SubscriberState = {
  open: false,
  method: "POST",
};

export const subscriberSlice = createSlice({
  name: "subscriber",
  initialState,
  reducers: {
    create: (state) => {
      state.open = true;
      state.method = "POST";
    },
    deleteSub: (state, action: PayloadAction<SubscriberState["data"]>) => {},
    update: (state, action: PayloadAction<SubscriberState["data"]>) => {},
    close: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { create, deleteSub, update, close } = subscriberSlice.actions;

export default subscriberSlice.reducer;
