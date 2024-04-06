import { Task } from "@/constant/reduxApi";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { taskAdd } from "../slice/taskSlice";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URI }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
      getTask: builder.query({
        query: (params) => ({
          url: `/${Task}`,
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
