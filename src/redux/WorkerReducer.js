import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

export const getAllWorker = createAsyncThunk("getAllWorker", async (body) => {
  try {
    const { data } = await axiosInstance.get(
      `/admin/getAllWorkers?page=${body.page}&limit=${body.limit}&search=${body.search || ''}&type=${body.type || ''}`
    );
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});
export const getAllActiveWorker = createAsyncThunk(
  "getAllActiveWorker",
  async (body) => {
    try {
      const { data } = await axiosInstance.get(
        `/admin/getAllActiveWorkers?page=${body.page}&limit=${body.limit}${body.jobId ? '&jobId=' + body.jobId : ""}`
      );
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const workerDetailById = createAsyncThunk(
  "workerDetailById",
  async (id) => {
    try {
      const { data } = await axiosInstance.get(
        `/admin/getWorkerDetailsById?workerId=${id}`
      );
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
const WorkerSlice = createSlice({
  name: "WorkerSlice",
  initialState: {
    getWorker_isLoading: false,
    getWorker_Data: "",
    getWorker_isError: "",

    getAllActiveWorker_isLoading: false,
    getAllActiveWorker_Data: "",
    getAllActiveWorker_isError: "",

    workerDetail_isLoading: false,
    workerDetail_Data: "",
    workerDetail_isError: "",
  },
  reducers: {
    clearWorkeDetail: (state) => {
      state.workerDetail_isLoading = false;
      state.workerDetail_Data = "";
      state.workerDetail_isError = "";
    },
  },
  extraReducers: {
    [getAllActiveWorker.pending]: (state) => {
      state.getAllActiveWorker_isLoading = true;
    },
    [getAllActiveWorker.fulfilled]: (state, actions) => {
      state.getAllActiveWorker_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getAllActiveWorker_isError = data;
      } else {
        state.getAllActiveWorker_Data = data;
        state.getAllActiveWorker_isError = "";
      }
    },
    [getAllActiveWorker.rejected]: (state) => {
      state.getAllActiveWorker_isLoading = false;
    },
    [getAllWorker.pending]: (state) => {
      state.getWorker_isLoading = true;
    },
    [getAllWorker.fulfilled]: (state, actions) => {
      state.getWorker_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getWorker_isError = data;
      } else {
        state.getWorker_Data = data;
        state.getWorker_isError = "";
      }
    },
    [getAllWorker.rejected]: (state) => {
      state.getWorker_isLoading = false;
    },

    [workerDetailById.pending]: (state) => {
      state.workerDetail_isLoading = true;
    },
    [workerDetailById.fulfilled]: (state, actions) => {
      state.workerDetail_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.workerDetail_isError = data;
      } else {
        state.workerDetail_Data = data;
        state.workerDetail_isError = "";
      }
    },
    [workerDetailById.rejected]: (state) => {
      state.workerDetail_isLoading = false;
    },
  },
});
export default WorkerSlice.reducer;
export const { clearWorkeDetail } = WorkerSlice.actions;
