import { Task } from "@/constant/reduxApi";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { taskAdd } from "../slice/taskSlice";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URI }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
      getTask: builder.query({
        query: () => ({
          url: `/${Task}`,
          method: "GET",
          credentials: "include" as const,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            if (data) {
              dispatch(taskAdd(data));
            }
          } catch (error) {
            console.error(error);
          }
        },
        providesTags: ["Task"],
      }),
  }),
});

export const { useGetTaskQuery } = apiSlice;
