import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    listings: [],
    listing: {},
    totalCount: 0,
};

// Create slice
export const listingsSlice = createAppSlice({
    name: "listingsSlice",
    initialState,
    reducers: {
        setListingsList: (state, action: PayloadAction<any>) => {
            state.listings = action.payload;
        },
        setTotalCount: (state, action: PayloadAction<any>) => {
            state.totalCount = action.payload;
        },


    },
    selectors: {
        selectListingsList: (listingsSlice) => listingsSlice.listings,
        selectTotalCount: (listingsSlice) => listingsSlice.totalCount,

    },
});

// Action creators
export const { setListingsList, setTotalCount } = listingsSlice.actions;
export const { selectListingsList, selectTotalCount } = listingsSlice.selectors;


