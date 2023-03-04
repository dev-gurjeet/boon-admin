import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

export const saveDirectTransfer = createAsyncThunk(
  "saveDirectTransfer",
  async (body) => {
    try {
      const { data } = await axiosInstance.put(
        "/admin/directTransferDetails",
        body
      );
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const saveETransfer = createAsyncThunk("saveETransfer", async (body) => {
  try {
    const { data } = await axiosInstance.put("/admin/eTransferDetails", body);
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});

export const getDirectTransferDetails = createAsyncThunk(
  "getDirectTransferDetails",
  async (body) => {
    try {
      const { data } = await axiosInstance.get(
        "/admin/getDirectTransferDetails"
      );
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);

export const getETransferDetails = createAsyncThunk(
  "getETransferDetails",
  async (body) => {
    try {
      const { data } = await axiosInstance.get("/admin/getETransferDetails");
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);

const PaymentSlice = createSlice({
  name: "PaymentSlice",
  initialState: {
    saveDirectTransfer_isLoading: false,
    saveDirectTransfer_Data: "",
    saveDirectTransfer_isError: "",

    saveETransfer_isLoading: false,
    saveETransfer_Data: "",
    saveETransfer_isError: "",

    getDirectTransferDetails_isLoading: false,
    getDirectTransferDetails_Data: "",
    getDirectTransferDetails_isError: "",

    getETransferDetails_isLoading: false,
    getETransferDetails_Data: "",
    getETransferDetails_isError: "",
  },
  reducers: {},
  extraReducers: {
    [saveDirectTransfer.pending]: (state) => {
      state.saveDirectTransfer_isLoading = true;
    },
    [saveDirectTransfer.fulfilled]: (state, actions) => {
      state.saveDirectTransfer_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        toast.error("something went wrong");
        state.saveDirectTransfer_isError = data;
      } else {
        toast.success("Direct transfer detail Updated");
        state.saveDirectTransfer_Data = data;
        state.saveDirectTransfer_isError = "";
      }
    },
    [saveDirectTransfer.rejected]: (state) => {
      state.saveDirectTransfer_isLoading = false;
    },

    [saveETransfer.pending]: (state) => {
      state.saveETransfer_isLoading = true;
    },
    [saveETransfer.fulfilled]: (state, actions) => {
      state.saveETransfer_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        toast.error("something went wrong");
        state.saveETransfer_isError = data;
      } else {
        toast.success("E-transfer detail Updated");
        state.saveETransfer_Data = data;
        state.saveETransfer_isError = "";
      }
    },
    [saveETransfer.rejected]: (state) => {
      state.saveETransfer_isLoading = false;
    },

    [getDirectTransferDetails.pending]: (state) => {
      state.getDirectTransferDetails_isLoading = true;
    },
    [getDirectTransferDetails.fulfilled]: (state, actions) => {
      state.getDirectTransferDetails_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getDirectTransferDetails_isError = data;
      } else {
        state.getDirectTransferDetails_Data = data;
        state.getDirectTransferDetails_isError = "";
      }
    },
    [getDirectTransferDetails.rejected]: (state) => {
      state.getDirectTransferDetails_isLoading = false;
    },

    [getETransferDetails.pending]: (state) => {
      state.getETransferDetails_isLoading = true;
    },
    [getETransferDetails.fulfilled]: (state, actions) => {
      state.getETransferDetails_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getETransferDetails_isError = data;
      } else {
        state.getETransferDetails_Data = data;
        state.getETransferDetails_isError = "";
      }
    },
    [getETransferDetails.rejected]: (state) => {
      state.getETransferDetails_isLoading = false;
    },
  },
});
export default PaymentSlice.reducer;
export const { clearChangePassword, logOut } = PaymentSlice.actions;
