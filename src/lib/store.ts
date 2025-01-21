import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { listingsApiSlice } from "./features/listings/listingsApiSlice";
import { listingsSlice } from "./features/listings/listingsSlice"

const rootReducer = combineSlices(
    listingsApiSlice,
    listingsSlice,
);

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration
export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        // Adding the api middleware for both quotes and auth APIs
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware()
                .concat(
                    listingsApiSlice.middleware,
                );
        },
    });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;
