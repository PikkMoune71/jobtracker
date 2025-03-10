import { createSlice } from "@reduxjs/toolkit";

import { fetchStatus } from "../actions/statusActions";
import { Status } from "@/types/Status";

export interface StatusState {
  status: Status[];
  state: string;
  error: string | undefined;
}

const initialState: StatusState = {
  status: [],
  state: "idle",
  error: "",
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchStatus.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.status = action.payload;
        state.state = "succeeded";
      })
      .addCase(fetchStatus.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default statusSlice.reducer;
