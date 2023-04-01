import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

export const getAllContractors = createAsyncThunk(
  "getAllContractors",
  async (body) => {
    try {
      const { data } = await axiosInstance.get(
        `/admin/getAllContractors?page=${body.page}&limit=${body.limit}&search=${body.search}`
      );
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);

export const contractorDetailById = createAsyncThunk(
  "contractorDetailById",
  async (id) => {
    try {
      const { data } = await axiosInstance.get(
        `/admin/getContractorDetailsById?contractorId=${id}`
      );
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const contractorJobById = createAsyncThunk(
  "contractorJobById",
  async (body) => {
    try {
      const { data } = await axiosInstance.get(
        `/admin/getContractorJobs?contractorId=${body.id}&page=${body.page}&limit=${body.limit}`
      );
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const getAllcontractorJobs = createAsyncThunk(
  "getAllcontractorJobs",
  async (body) => {
    try {
      const { data } = await axiosInstance.get(
        `/admin/getContractorJobs?limit=${body.limit}&page=${body.page}&search=${body.search}`
      );
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);

export const contractorJobDetail = createAsyncThunk(
  "contractorJobDetail",
  async (id) => {
    try {
      const { data } = await axiosInstance.get(
        `/admin/getContractorJobs?contractorId=${id}`
      );
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);

const ContractorSlice = createSlice({
  name: "ContractorSlice",
  initialState: {
    getContractors_isLoading: false,
    getContractors_Data: "",
    getContractors_isError: "",

    contractorDetail_isLoading: false,
    contractorDetail_Data: "",
    contractorDetail_isError: "",

    contractorJobDetail_isLoading: false,
    contractorJobDetail_Data: "",
    contractorJobDetail_isError: "",

    contractorJobById_isLoading: false,
    contractorJobById_Data: "",
    contractorJobById_isError: "",

    getAllcontractorJobs_isLoading: false,
    getAllcontractorJobs_Data: "",
    getAllcontractorJobs_isError: "",
  },
  reducers: {
    clearContractorDetail: (state) => {
      state.contractorDetail_isLoading = false;
      state.contractorDetail_Data = "";
      state.contractorDetail_isError = "";
    },
  },
  extraReducers: {
    [getAllContractors.pending]: (state) => {
      state.getContractors_isLoading = true;
    },
    [getAllContractors.fulfilled]: (state, actions) => {
      state.getContractors_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getContractors_isError = data;
      } else {
        state.getContractors_Data = data;
        state.getContractors_isError = "";
      }
    },
    [getAllContractors.rejected]: (state) => {
      state.getContractors_isLoading = false;
    },

    [contractorDetailById.pending]: (state) => {
      state.contractorDetail_isLoading = true;
    },
    [contractorDetailById.fulfilled]: (state, actions) => {
      state.contractorDetail_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.contractorDetail_isError = data;
      } else {
        state.contractorDetail_Data = data;
        state.contractorDetail_isError = "";
      }
    },
    [contractorDetailById.rejected]: (state) => {
      state.contractorDetail_isLoading = false;
    },

    [contractorJobDetail.pending]: (state) => {
      state.contractorJobDetail_isLoading = true;
    },
    [contractorJobDetail.fulfilled]: (state, actions) => {
      state.contractorJobDetail_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.contractorJobDetail_isError = data;
      } else {
        state.contractorJobDetail_Data = data;
        state.contractorJobDetail_isError = "";
      }
    },
    [contractorJobDetail.rejected]: (state) => {
      state.contractorJobDetail_isLoading = false;
    },

    [contractorJobById.pending]: (state) => {
      state.contractorJobById_isLoading = true;
    },
    [contractorJobById.fulfilled]: (state, actions) => {
      state.contractorJobById_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.contractorJobById_isError = data;
      } else {
        state.contractorJobById_Data = data;
        state.contractorJobById_isError = "";
      }
    },
    [contractorJobById.rejected]: (state) => {
      state.contractorJobById_isLoading = false;
    },

    [getAllcontractorJobs.pending]: (state) => {
      state.getAllcontractorJobs_isLoading = true;
    },
    [getAllcontractorJobs.fulfilled]: (state, actions) => {
      state.getAllcontractorJobs_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getAllcontractorJobs_isError = data;
      } else {
        state.getAllcontractorJobs_Data = data;
        state.getAllcontractorJobs_isError = "";
      }
    },
    [getAllcontractorJobs.rejected]: (state) => {
      state.getAllcontractorJobs_isLoading = false;
    },
  },
});
export default ContractorSlice.reducer;
export const { clearContractorDetail } = ContractorSlice.actions;
