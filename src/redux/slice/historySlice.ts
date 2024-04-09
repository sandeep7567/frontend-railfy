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

export interface HistoryState {
  history: TaskInfoType[];
  pageInfo: {
    totalDoc: number;
    totalPages: number;
    currentPage: number;
  };
};

const initialState: HistoryState = {
  history: [],
  pageInfo: {
    totalDoc: 0,
    totalPages: 0,
    currentPage: 0,
  },
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    historyAdd: (state, { payload }: PayloadAction<any>) => {
      state.history = payload.history;
      state.pageInfo = payload.pagination;
    },

    historyRemove: (state) => {
      state.history = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { historyAdd, historyRemove } = historySlice.actions;

export default historySlice.reducer;
