import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskState {
  data: any;
  pageInfo: {
    totalDoc: number;
    totalPages: number;
    currentPage: number;
  };
}

const initialState: TaskState = {
  data: [],
  pageInfo: {
    totalDoc: 0,
    totalPages: 0,
    currentPage: 0,
  },
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    taskAdd: (state, { payload }: PayloadAction<any>) => {
      state.data = payload.taskInfo;
      state.pageInfo.totalDoc = payload.totalDoc;
      state.pageInfo.totalPages = payload.totalPages;
      state.pageInfo.currentPage = payload.currentPage;
    },

    taskRemove: (state) => {
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { taskAdd, taskRemove } = taskSlice.actions;

export default taskSlice.reducer;
