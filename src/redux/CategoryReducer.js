import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
export const getCommonDetails = createAsyncThunk(
  "getCommonDetails",
  async (body) => {
    try {
      const { data } = await axiosInstance.get("/admin/getCommonDetails");
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const saveCommonDetails = createAsyncThunk(
  "saveCommonDetails",
  async (body) => {
    try {
      const { data } = await axiosInstance.put(
        "/admin/saveCommonDetails",
        body
      );
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const addCategory = createAsyncThunk("addCategory", async (body) => {
  try {
    const { data } = await axiosInstance.post("/category", body);
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});

export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (body) => {
    try {
      const { data } = await axiosInstance.put("/category", body);
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const getCategory = createAsyncThunk("getCategory", async () => {
  try {
    const { data } = await axiosInstance.get("/category");
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});
export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (body) => {
    console.log(body, "redux body");
    try {
      const { data } = await axiosInstance.delete("/category", {
        data: JSON.stringify(body),
      });
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
export const reorderCategory = createAsyncThunk(
  "reorderCategory",
  async (body) => {
    try {
      const { data } = await axiosInstance.put(
        "/category/reOrderCategories",
        body
      );
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);

const CategorySlice = createSlice({
  name: "CategorySlice",
  initialState: {
    addCategory_isLoading: false,
    addCategory_Data: "",
    addCategory_isError: "",

    updateCategory_isLoading: false,
    updateCategory_Data: "",
    updateCategory_isError: "",

    getCategory_isLoading: false,
    getCategory_Data: "",
    getCategory_isError: "",

    deleteCategory_isLoading: false,
    deleteCategory_Data: "",
    deleteCategory_isError: "",

    getCommonDetails_isLoading: false,
    getCommonDetails_Data: "",
    getCommonDetails_isError: "",

    saveCommonDetails_isLoading: false,
    saveCommonDetails_Data: "",
    saveCommonDetails_isError: "",

    reorderCategory_isLoading: false,
    reorderCategory_Data: "",
    reorderCategory_isError: "",
  },
  reducers: {
    clearUpdate: (state) => {
      state.updateCategory_isLoading = false;
      state.updateCategory_Data = "";
      state.updateCategory_isError = "";
    },
    clearSaveCommonDetails: (state) => {
      state.saveCommonDetails_isLoading = false;
      state.saveCommonDetails_Data = "";
      state.saveCommonDetails_isError = "";
    },
    clearreorderCategory: (state) => {
      state.reorderCategory_isLoading = false;
      state.reorderCategory_Data = "";
      state.reorderCategory_isError = "";
    },
    clearDelete: (state) => {
      state.deleteCategory_isLoading = false;
      state.deleteCategory_Data = "";
      state.deleteCategory_isError = "";
    },

    clearAdd: (state) => {
      state.addCategory_isLoading = false;
      state.addCategory_Data = "";
      state.addCategory_isError = "";
    },
  },
  extraReducers: {
    [getCommonDetails.pending]: (state) => {
      state.getCommonDetails_isLoading = true;
    },
    [getCommonDetails.fulfilled]: (state, actions) => {
      state.getCommonDetails_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getCommonDetails_isError = data;
      } else {
        state.getCommonDetails_Data = data;
        state.getCommonDetails_isError = "";
      }
    },
    [getCommonDetails.rejected]: (state) => {
      state.getCommonDetails_isLoading = false;
    },
    [saveCommonDetails.pending]: (state) => {
      state.saveCommonDetails_isLoading = true;
    },
    [saveCommonDetails.fulfilled]: (state, actions) => {
      state.saveCommonDetails_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.saveCommonDetails_isError = data;
      } else {
        state.saveCommonDetails_Data = data;
        state.saveCommonDetails_isError = "";
      }
    },
    [saveCommonDetails.rejected]: (state) => {
      state.saveCommonDetails_isLoading = false;
    },

    [addCategory.pending]: (state) => {
      state.addCategory_isLoading = true;
    },
    [addCategory.fulfilled]: (state, actions) => {
      state.addCategory_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.addCategory_isError = data;
      } else {
        state.addCategory_Data = data;
        state.addCategory_isError = "";
      }
    },
    [addCategory.rejected]: (state) => {
      state.addCategory_isLoading = false;
    },

    [reorderCategory.pending]: (state) => {
      state.reorderCategory_isLoading = true;
    },
    [reorderCategory.fulfilled]: (state, actions) => {
      state.reorderCategory_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.reorderCategory_isError = data;
      } else {
        state.reorderCategory_Data = data;
        state.reorderCategory_isError = "";
      }
    },
    [reorderCategory.rejected]: (state) => {
      state.reorderCategory_isLoading = false;
    },

    [updateCategory.pending]: (state) => {
      state.updateCategory_isLoading = true;
    },
    [updateCategory.fulfilled]: (state, actions) => {
      state.updateCategory_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.updateCategory_isError = data;
      } else {
        state.updateCategory_Data = data;
        state.updateCategory_isError = "";
      }
    },
    [updateCategory.rejected]: (state) => {
      state.updateCategory_isLoading = false;
    },

    [getCategory.pending]: (state) => {
      state.getCategory_isLoading = true;
    },
    [getCategory.fulfilled]: (state, actions) => {
      state.getCategory_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.getCategory_isError = data;
      } else {
        state.getCategory_Data = data;
        state.getCategory_isError = "";
      }
    },
    [getCategory.rejected]: (state) => {
      state.getCategory_isLoading = false;
    },

    [deleteCategory.pending]: (state) => {
      state.deleteCategory_isLoading = true;
    },
    [deleteCategory.fulfilled]: (state, actions) => {
      state.deleteCategory_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.deleteCategory_isError = data;
      } else {
        state.deleteCategory_Data = data;
        state.deleteCategory_isError = "";
      }
    },
    [deleteCategory.rejected]: (state) => {
      state.deleteCategory_isLoading = false;
    },
  },
});
export default CategorySlice.reducer;
export const {
  clearUpdate,
  clearDelete,
  clearAdd,
  clearSaveCommonDetails,
  clearreorderCategory,
} = CategorySlice.actions;
