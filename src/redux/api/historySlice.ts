import { HISTORY } from "@/constant/constant";
import { apiSlice } from "./apiSlice";
import { historyAdd, historyRemove } from "../slice/historySlice";

type TaskResponse = {
  message: string;
  success: boolean;
  data?: any;
};

type HistoryData = {
  taskId: string;
  pageIndex: number;
  pageSize: number;
  field: string;
  order: string;
};

export const historyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistoryByTaskId: builder.query<unknown, HistoryData>({
      query: ({ taskId, ...params }) => ({
        url: `${HISTORY}/${taskId}`,
        method: "GET",
        params,
        credentials: "include" as const,
      }),
      transformResponse: (response: any) => {
        if (response.statusCode === 200) {
          return {
            ...response,
            data: {
              ...response.data,
              history: response.data.history.map((item: any) => ({
                ...item,
                ...{
                  ...item.taskHistory,
                  dueDate: item.taskHistory.dueDate
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-"),
                  maintainceDate: item.taskHistory.maintainceDate
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-"),
                },
              })),
            },
          };
        }
        return { ...response, statusCode: 400 };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }: any) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          data && dispatch(historyAdd(data));
        } catch (error) {
          console.error(error);
        }
      },
      providesTags: ["History"],
    }),
    getHistoryByHistoryId: builder.query<
      TaskResponse,
      { taskId: string; historyId: string }
    >({
      query: ({ historyId, taskId }) => ({
        url: `${HISTORY}/${taskId}/${historyId}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["History"],
    }),
    deleteAllHistoryByTaskId: builder.mutation<TaskResponse, string>({
      query: (taskId) => ({
        url: `${HISTORY}/${taskId}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(historyRemove());
          }
        } catch (error) {
          console.error(error);
        }
      },
      invalidatesTags: ["History"],
    }),
    deleteHistoryByHistoryId: builder.mutation<
      TaskResponse,
      { taskId: string; historyId: string }
    >({
      query: ({ historyId, taskId }) => ({
        url: `${HISTORY}/${taskId}/${historyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["History"],
    }),
  }),
});

export const {
  useGetAllHistoryByTaskIdQuery,
  useDeleteAllHistoryByTaskIdMutation,
  useDeleteHistoryByHistoryIdMutation,
  useGetHistoryByHistoryIdQuery,
} = historyApi;
