import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

export const assignJob = createAsyncThunk("assignJob", async (body) => {
  try {
    const { data } = await axiosInstance.put(`/admin/assignJob`, body);
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});
export const updateJobPrice = createAsyncThunk(
  "updateJobPrice",
  async (body) => {
    try {
      const { data } = await axiosInstance.put(`/admin/updateJobDetails`, body);
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);

export const jobRequest = createAsyncThunk("jobRequest", async (body) => {
  try {
    const { data } = await axiosInstance.put(`/admin/jobRequest`, body);
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});

export const getTimings = createAsyncThunk("getTimings", async (id) => {
  try {
    const { data } = await axiosInstance.get(
      `/admin/getTimingsByJobId?jobId=${id}`
    );
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});
export const jobDetail = createAsyncThunk("jobDetail", async (id) => {
  try {
    const { data } = await axiosInstance.get(
      `/admin/getJobDetailsByJobId?jobId=${id}`
    );
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});

const jobSlice = createSlice({
  name: "jobSlice",
  initialState: {
    updateJobPrice_isLoading: false,
    updateJobPrice_Data: "",
    updateJobPrice_isError: "",

    jobRequest_isLoading: false,
    jobRequest_Data: "",
    jobRequest_isError: "",

    jobDetail_isLoading: false,
    jobDetail_Data: "",
    jobDetail_isError: "",

    assignJob_isLoading: false,
    assignJob_Data: "",
    assignJob_isError: "",

    getTimings_isLoading: false,
    getTimings_Data: "",
    getTimings_isError: "",
  },
  reducers: {
    clearupdatejob: (state) => {
      state.updateJobPrice_isLoading = false;
      state.updateJobPrice_Data = "";
      state.updateJobPrice_isError = "";
    },
    clearJobRequest: (state) => {
      state.jobRequest_isLoading = false;
      state.jobRequest_Data = "";
      state.jobRequest_isError = "";
    },
    clearAssignJob: (state) => {
      state.assignJob_isLoading = false;
      state.assignJob_Data = "";
      state.assignJob_isError = "";
    },
  },
  extraReducers: {
    [assignJob.pending]: (state) => {
      state.assignJob_isLoading = true;
    },
    [assignJob.fulfilled]: (state, actions) => {
      state.assignJob_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.assignJob_isError = data;
      } else {
        state.assignJob_Data = data;
        state.assignJob_isError = "";
      }
    },
    [assignJob.rejected]: (state) => {
      state.assignJob_isLoading = false;
    },
    [updateJobPrice.pending]: (state) => {
      state.updateJobPrice_isLoading = true;
    },
    [updateJobPrice.fulfilled]: (state, actions) => {
      state.updateJobPrice_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.updateJobPrice_isError = data;
      } else {
        state.updateJobPrice_Data = data;
        state.updateJobPrice_isError = "";
      }
    },
    [updateJobPrice.rejected]: (state) => {
      state.updateJobPrice_isLoading = false;
    },

    [jobRequest.pending]: (state) => {
      state.jobRequest_isLoading = true;
    },
    [jobRequest.fulfilled]: (state, actions) => {
      state.jobRequest_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.jobRequest_isError = data;
      } else {
        state.jobRequest_Data = data;
        state.jobRequest_isError = "";
      }
    },
    [jobRequest.rejected]: (state) => {
      state.jobRequest_isLoading = false;
    },

    [jobDetail.pending]: (state) => {
      state.jobDetail_isLoading = true;
    },
    [jobDetail.fulfilled]: (state, actions) => {
      state.jobDetail_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.jobDetail_isError = data;
      } else {
        state.jobDetail_Data = data;
        state.jobDetail_isError = "";
      }
    },
    [jobDetail.rejected]: (state) => {
      state.jobDetail_isLoading = false;
    },

    [getTimings.pending]: (state) => {
      state.getTimings_isLoading = true;
    },
    [getTimings.fulfilled]: (state, actions) => {
      state.getTimings_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getTimings_isError = data;
      } else {
        state.getTimings_Data = data;
        state.getTimings_isError = "";
      }
    },
    [getTimings.rejected]: (state) => {
      state.getTimings_isLoading = false;
    },
  },
});
export default jobSlice.reducer;
export const { clearupdatejob, clearJobRequest, clearAssignJob } =
  jobSlice.actions;
