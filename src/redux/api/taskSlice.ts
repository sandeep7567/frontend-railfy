import { Task } from "@/constant/reduxApi";
import { apiSlice } from "./apiSlice";
import { taskRemove } from "../slice/taskSlice";

type TaskResponese = {
  message: string;
  success: boolean;
  data?: any;
};

type TaskData = {
  _id?: string;
  title: string;
  description: string | undefined;
  maintainceDate: Date;
  days: number;
};

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<TaskResponese, TaskData>({
      query: (data) => ({
        url: `/${Task}`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTaskById: builder.mutation<TaskResponese, TaskData>({
      query: (data) => ({
        url: `/${Task}/${data._id}`,
        method: "PATCH",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["Task"],
    }),
    getTaskById: builder.query<TaskResponese, void>({
      query: (id) => ({
        url: `/${Task}/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Task"],
    }),
    deleteAllTask: builder.mutation<TaskResponese, void>({
      query: () => ({
        url: `/${Task}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(taskRemove());
          }
        } catch (error) {
          console.error(error);
        }
      },
      invalidatesTags: ["Task"],
    }),
    deleteTaskById: builder.mutation<TaskResponese, string>({
      query: (id: string) => ({
        url: `/${Task}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useUpdateTaskByIdMutation,
  useGetTaskByIdQuery,
  useDeleteAllTaskMutation,
  useDeleteTaskByIdMutation
} = taskApi;
