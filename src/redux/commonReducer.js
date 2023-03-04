import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

export const saveSetting = createAsyncThunk("saveSetting", async (body) => {
  try {
    const { data } = await axiosInstance.put(`/admin/settings`, body);
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});

export const getSetting = createAsyncThunk("getSetting", async (body) => {
  try {
    const { data } = await axiosInstance.get(`/admin/getSettings`);
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});

export const getDashboardCount = createAsyncThunk(
  "getDashboardCount",
  async (body) => {
    try {
      const { data } = await axiosInstance.get(`/admin/getDashboardCount`);
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const getNotification = createAsyncThunk(
  "getNotification",
  async (body) => {
    try {
      const { data } = await axiosInstance.get(
        `/admin/getNotifications?page=${body.page}&limit=${body.limit}`
      );
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);

export const updateUser = createAsyncThunk("updateUser", async (body) => {
  try {
    const { data } = await axiosInstance.put(`/admin/updateUser`, body);
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});
export const getProfile = createAsyncThunk("getProfile", async (body) => {
  try {
    const { data } = await axiosInstance.get(`/admin/getProfile`);
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});

export const getAllBookings = createAsyncThunk(
  "getAllBookings",
  async (body) => {
    try {
      const { data } = await axiosInstance.get(`/admin/getAllBookings`);
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const directTransferDetail = createAsyncThunk(
  "directTransferDetail",
  async (body) => {
    try {
      const { data } = await axiosInstance.put(
        `/admin/directTransferDetails`,
        body
      );
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const getDirectTransferDetail = createAsyncThunk(
  "getDirectTransferDetail",
  async (body) => {
    try {
      const { data } = await axiosInstance.get(
        `/admin/getDirectTransferDetails`
      );
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const eTransferDetails = createAsyncThunk(
  "eTransferDetails",
  async (body) => {
    try {
      const { data } = await axiosInstance.put(`/admin/eTransferDetails`, body);
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const getTransferDetail = createAsyncThunk(
  "getTransferDetail",
  async (body) => {
    try {
      const { data } = await axiosInstance.get(`/admin/getETransferDetails`);
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const uploadDocument = createAsyncThunk(
  "uploadDocument",
  async (body) => {
    try {
      const { data } = await axiosInstance.post(`/admin/upload`, body);
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const markPaymentDone = createAsyncThunk(
  "markPaymentDone",
  async (body) => {
    try {
      const { data } = await axiosInstance.put(`/admin/markPaymentDone`, body);
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const getChatUsers = createAsyncThunk("getChatUsers", async (body) => {
  try {
    const { data } = await axiosInstance.get(
      `/admin/getChatUsers?page=${body.page}&limit=${body.limit}`
    );
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});

export const getJobChats = createAsyncThunk("getJobChats", async (body) => {
  try {
    const { data } = await axiosInstance.get(
      `admin/getChat?jobId=${body.id}&userId=${body.userId}&page=${body.page}&limit=${body.limit}`
    );
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});
export const getChats = createAsyncThunk("getChats", async (body) => {
  try {
    const { data } = await axiosInstance.get(
      `admin/getChat?userId=${body.id}&page=${body.page}&limit=${body.limit}`
    );
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});

const commonSlice = createSlice({
  name: "commonSlice",
  initialState: {
    saveSetting_isLoading: false,
    saveSetting_Data: "",
    saveSetting_isError: "",

    dashboardCount_isLoading: false,
    dashboardCount_Data: "",
    dashboardCount_isError: "",

    getNotification_isLoading: false,
    getNotification_Data: "",
    getNotification_isError: "",

    updateUser_isLoading: false,
    updateUser_Data: "",
    updateUser_isError: "",

    getProfile_isLoading: false,
    getProfile_Data: "",
    getProfile_isError: "",

    getAllBookings_isLoading: false,
    getAllBookings_Data: "",
    getAllBookings_isError: "",

    uploadDocument_isLoading: false,
    uploadDocument_Data: "",
    uploadDocument_isError: "",

    getSetting_isLoading: false,
    getSetting_Data: "",
    getSetting_isError: "",

    markPaymentDone_isLoading: false,
    markPaymentDone_Data: "",
    markPaymentDone_isError: "",

    getChatUsers_isLoading: false,
    getChatUsers_Data: "",
    getChatUsers_isError: "",

    getChats_isLoading: false,
    getChats_Data: "",
    getChats_isError: "",

    getJobChats_isLoading: false,
    getJobChats_Data: "",
    getJobChats_isError: "",
  },
  reducers: {
    clearUpdateuser: (state) => {
      state.updateUser_isLoading = false;
      state.updateUser_Data = "";
      state.updateUser_isError = "";
    },
    clearSaveSetting: (state) => {
      state.saveSetting_isLoading = false;
      state.saveSetting_Data = "";
      state.saveSetting_isError = "";
    },
    clearUploadDocument: (state) => {
      state.uploadDocument_isLoading = false;
      state.uploadDocument_Data = "";
      state.uploadDocument_isError = "";
    },

    clearmarkPaymentDone: (state) => {
      state.markPaymentDone_isLoading = false;
      state.markPaymentDone_Data = "";
      state.markPaymentDone_isError = "";
    },
  },
  extraReducers: {
    [getJobChats.pending]: (state) => {
      state.getJobChats_isLoading = true;
    },
    [getJobChats.fulfilled]: (state, actions) => {
      state.getJobChats_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getJobChats_isError = data;
      } else {
        state.getJobChats_Data = data;
        state.getJobChats_isError = "";
      }
    },
    [getJobChats.rejected]: (state) => {
      state.getJobChats_isLoading = false;
    },
    [saveSetting.pending]: (state) => {
      state.saveSetting_isLoading = true;
    },
    [saveSetting.fulfilled]: (state, actions) => {
      state.saveSetting_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.saveSetting_isError = data;
      } else {
        state.saveSetting_Data = data;
        state.saveSetting_isError = "";
      }
    },
    [saveSetting.rejected]: (state) => {
      state.saveSetting_isLoading = false;
    },

    [getDashboardCount.pending]: (state) => {
      state.dashboardCount_isLoading = true;
    },
    [getDashboardCount.fulfilled]: (state, actions) => {
      state.dashboardCount_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.dashboardCount_isError = data;
      } else {
        state.dashboardCount_Data = data;
        state.dashboardCount_isError = "";
      }
    },
    [getDashboardCount.rejected]: (state) => {
      state.dashboardCount_isLoading = false;
    },

    [updateUser.pending]: (state) => {
      state.updateUser_isLoading = true;
    },
    [updateUser.fulfilled]: (state, actions) => {
      state.updateUser_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.updateUser_isError = data;
      } else {
        state.updateUser_Data = data;
        state.updateUser_isError = "";
      }
    },
    [updateUser.rejected]: (state) => {
      state.updateUser_isLoading = false;
    },

    [getProfile.pending]: (state) => {
      state.getProfile_isLoading = true;
    },
    [getProfile.fulfilled]: (state, actions) => {
      state.getProfile_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getProfile_isError = data;
      } else {
        state.getProfile_Data = data;
        state.getProfile_isError = "";
      }
    },
    [getProfile.rejected]: (state) => {
      state.getProfile_isLoading = false;
    },

    [getAllBookings.pending]: (state) => {
      state.getAllBookings_isLoading = true;
    },
    [getAllBookings.fulfilled]: (state, actions) => {
      state.getAllBookings_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getAllBookings_isError = data;
      } else {
        state.getAllBookings_Data = data;
        state.getAllBookings_isError = "";
      }
    },
    [getAllBookings.rejected]: (state) => {
      state.getAllBookings_isLoading = false;
    },

    [getNotification.pending]: (state) => {
      state.getNotification_isLoading = true;
    },
    [getNotification.fulfilled]: (state, actions) => {
      state.getNotification_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getNotification_isError = data;
      } else {
        state.getNotification_Data = data;
        state.getNotification_isError = "";
      }
    },
    [getNotification.rejected]: (state) => {
      state.getNotification_isLoading = false;
    },

    [uploadDocument.pending]: (state) => {
      state.uploadDocument_isLoading = true;
    },
    [uploadDocument.fulfilled]: (state, actions) => {
      state.uploadDocument_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.uploadDocument_isError = data;
      } else {
        state.uploadDocument_Data = data;
        state.uploadDocument_isError = "";
      }
    },
    [uploadDocument.rejected]: (state) => {
      state.uploadDocument_isLoading = false;
    },

    [getSetting.pending]: (state) => {
      state.getSetting_isLoading = true;
    },
    [getSetting.fulfilled]: (state, actions) => {
      state.getSetting_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getSetting_isError = data;
      } else {
        state.getSetting_Data = data;
        state.getSetting_isError = "";
      }
    },
    [getSetting.rejected]: (state) => {
      state.getSetting_isLoading = false;
    },

    [markPaymentDone.pending]: (state) => {
      state.markPaymentDone_isLoading = true;
    },
    [markPaymentDone.fulfilled]: (state, actions) => {
      state.markPaymentDone_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.markPaymentDone_isError = data;
      } else {
        state.markPaymentDone_Data = data;
        state.markPaymentDone_isError = "";
      }
    },
    [markPaymentDone.rejected]: (state) => {
      state.markPaymentDone_isLoading = false;
    },

    [getChatUsers.pending]: (state) => {
      state.getChatUsers_isLoading = true;
    },
    [getChatUsers.fulfilled]: (state, actions) => {
      state.getChatUsers_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getChatUsers_isError = data;
      } else {
        state.getChatUsers_Data = data;
        state.getChatUsers_isError = "";
      }
    },
    [getChatUsers.rejected]: (state) => {
      state.getChatUsers_isLoading = false;
    },

    [getChats.pending]: (state) => {
      state.getChats_isLoading = true;
    },
    [getChats.fulfilled]: (state, actions) => {
      state.getChats_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getChats_isError = data;
      } else {
        state.getChats_Data = data;
        state.getChats_isError = "";
      }
    },
    [getChats.rejected]: (state) => {
      state.getChats_isLoading = false;
    },
  },
});
export default commonSlice.reducer;
export const {
  clearUpdateuser,
  clearSaveSetting,
  clearUploadDocument,
  clearmarkPaymentDone,
} = commonSlice.actions;
