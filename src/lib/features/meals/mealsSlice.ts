import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MealSliceState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: MealSliceState = {
  value: 0,
  status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const mealsSlice = createAppSlice({
  name: "meals",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    increment: create.reducer((state) => {
      /* (===========)  Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //  (===========) */
      state.value += 1;
    }),
    decrement: create.reducer((state) => {
      state.value -= 1;
    }),


  }),
  /* (-==========) You can define your selectors here. These selectors receive the slice
  // state as their first argument.  (-==========) */
  selectors: {
    selectCount: (counter) => counter.value,
    selectStatus: (counter) => counter.status,
  },
});

// Action creators are generated for each case reducer function.
export const { decrement, increment } =
  mealsSlice.actions;

/* (==========) Selectors returned by `slice.selectors` take the root state as their first argument.  (==========) */
export const { selectCount, selectStatus } = mealsSlice.selectors;


