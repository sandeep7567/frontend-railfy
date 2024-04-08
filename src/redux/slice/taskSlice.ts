import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskInfoType {
  days: number;
  description?: string;
  dueDate: Date;
  maintainceDate: Date;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
}

export interface TaskState {
  data: TaskInfoType[];
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
      state.pageInfo = payload.pageInfo;
    },

    taskRemove: (state) => {
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { taskAdd, taskRemove } = taskSlice.actions;

export default taskSlice.reducer;
