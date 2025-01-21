// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const mealsApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.pupify.ca/api/v1/listings" }),
    reducerPath: "mealsApiSlice",
    tagTypes: ["Meals"],
    endpoints: (builder) => ({
        getAllListings: builder.query({
            query: (data) => ({
                url: `/get-all-listings?page=${data.page}&limit=${data.limit}&isSoldOut=${data.isSoldOut}&type=${data.type}&isFeatured=${data.isFeatured}&search=${data.search ? data.search : ""}&status=${data.status ? data.status : ""}`,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }),

        }),

    }),
});

export const {
    useGetAllListingsQuery
} = mealsApiSlice;