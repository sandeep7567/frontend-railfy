import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { taskAdd } from "../slice/taskSlice";
import { TASK } from "@/constant/constant";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URI }),
  tagTypes: ["Task", "History"],
  endpoints: (builder) => ({
      getTask: builder.query({
        query: (params) => ({
          url: `${TASK}`,
          method: "GET",
          credentials: "include" as const,
          params,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            data && data?.statusCode === 200 && dispatch(taskAdd(data?.data));
          } catch (error) {
            console.error(error);
          }
        },
        providesTags: ["Task"],
      }),
  }),
});

export const { useGetTaskQuery } = apiSlice;
