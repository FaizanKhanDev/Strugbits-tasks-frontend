import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { mealsApiSlice } from "./features/meals/mealsApiSlice";
import { mealsSlice } from "./features/meals/mealsSlice";

/* (==========) Combine all slices into a single root slice =========== */
const rootReducer = combineSlices(
    mealsApiSlice,
    mealsSlice,
);

/*( =========) Infer the `RootState` type from the root reducer =========== */
export type RootState = ReturnType<typeof rootReducer>;

/* (=========) `makeStore` encapsulates the store configuration  (==============) */
export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        // Adding the api middleware for both quotes and auth APIs
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware()
                .concat(
                    mealsApiSlice.middleware,
                );
        },
    });
};

/* (===============) Infer the return type of `makeStore`  (===============) */
export type AppStore = ReturnType<typeof makeStore>;


/* (===============) Infer the `AppDispatch` type from the store itself  (===============) */
export type AppDispatch = AppStore["dispatch"];


export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;
