import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskState {
  data: any;
}

const initialState: TaskState = {
  data: null,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    taskAdd: (state, { payload }: PayloadAction<any>) => {
      state.data = payload;
    },

    taskReset: (state) => {
      state.data = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { taskAdd, taskReset } = taskSlice.actions;

export default taskSlice.reducer;
