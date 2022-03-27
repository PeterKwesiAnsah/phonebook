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
      state.data = undefined;
    },
    deleteSub: (state, action: PayloadAction<SubscriberState["data"]>) => {
      state.open = true;
      state.method = "DELETE";
      state.data = action.payload;
    },
    update: (state, action: PayloadAction<SubscriberState["data"]>) => {
      state.open = true;
      state.method = "PATCH";
      state.data = action.payload;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { create, deleteSub, update, close } = subscriberSlice.actions;

export default subscriberSlice.reducer;
