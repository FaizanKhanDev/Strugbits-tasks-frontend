// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const mealsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  reducerPath: "mealsApiSlice",
  tagTypes: ["Meals"],
  endpoints: (builder) => ({
    getMealsList: builder.query({
      query: () => "/recipes",
    })
  }),
});

export const {
  useGetMealsListQuery

} = mealsApiSlice;