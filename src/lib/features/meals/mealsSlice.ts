import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface Meal {
  tab: string;
  data: any[];
}
export interface MealSliceState {
  value: number;
  status: "idle" | "loading" | "failed";
  mealsList: Meal[];
}

const initialState: MealSliceState = {
  value: 0,
  status: "idle",
  mealsList: [
    { tab: "All Meals", data: [] },
    { tab: "Week 1", data: [] },
    { tab: "Week 2", data: [] },
    { tab: "Week 3", data: [] },
    { tab: "Week 4", data: [] },
  ],
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const mealsSlice = createAppSlice({
  name: "meals",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    setMealList: (state, action: PayloadAction<any>) => {
      const allMeals = state.mealsList.find((meal) => meal.tab == action.payload.tab);
      if (allMeals) {
        allMeals.data = action.payload.data;

      }
      let againgFInd = state.mealsList.find((meal) => meal.tab == action.payload.tab);
      if (againgFInd) {
        console.log(":FIRED", JSON.stringify(againgFInd.data));
      }
    },


  }),
  /* (-==========) You can define your selectors here. These selectors receive the slice
  // state as their first argument.  (-==========) */
  selectors: {
    selectMealsList: (counter) => counter.mealsList
  },
});

// Action creators are generated for each case reducer function.
export const { setMealList } =
  mealsSlice.actions;

/* (==========) Selectors returned by `slice.selectors` take the root state as their first argument.  (==========) */
export const { selectMealsList } = mealsSlice.selectors;


