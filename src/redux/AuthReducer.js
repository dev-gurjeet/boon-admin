import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
export const signUp = createAsyncThunk("signUp", async (body) => {
  try {
    const { data } = await axiosInstance.post("/admin/register", body);
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});
export const login = createAsyncThunk("login", async (body) => {
  try {
    const { data } = await axiosInstance.post("/admin/login", body);
    return { data };
  } catch (error) {
    const { data, status } = error.response;
    return { data, status };
  }
});

export const changePassword = createAsyncThunk(
  "changePassword",
  async (body) => {
    try {
      const { data } = await axiosInstance.put("/admin/changePassword", body);
      return { data };
    } catch (error) {
      const { data, status } = error.response;
      return { data, status };
    }
  }
);
const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    signup_isLoading: false,
    signup_Data: "",
    signup_isError: "",

    login_isLoading: false,
    login_Data: "",
    login_isError: "",

    changePassword_isLoading: false,
    changePassword_Data: "",
    changePassword_isError: "",

    logOut_Data: false,
    keepmelogin: false,
  },
  reducers: {
    clearChangePassword: (state) => {
      state.changePassword_isLoading = false;
      state.changePassword_Data = "";
      state.changePassword_isError = "";
    },

    logOut: (state) => {
      state.logOut_Data = true;
      localStorage.removeItem("boonAdmin");
    },
  },
  extraReducers: {
    [signUp.pending]: (state) => {
      state.signup_isLoading = true;
    },
    [signUp.fulfilled]: (state, actions) => {
      state.signup_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.signup_isError = data;
      } else {
        state.signup_Data = data;
        state.signup_isError = "";
      }
    },
    [signUp.rejected]: (state) => {
      state.signup_isLoading = false;
    },

    [login.pending]: (state) => {
      state.login_isLoading = true;
    },
    [login.fulfilled]: (state, actions) => {
      state.login_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.login_isError = data;
        toast.error("Crendtial Wrong");
      } else {
        localStorage.setItem("boonAdmin", JSON.stringify(data));
        state.logOut_Data = false;
        state.login_Data = data;
        state.login_isError = "";
        toast.success("Login Successfully");
      }
    },
    [login.rejected]: (state) => {
      state.login_isLoading = false;
    },

    [changePassword.pending]: (state) => {
      state.changePassword_isLoading = true;
    },
    [changePassword.fulfilled]: (state, actions) => {
      state.changePassword_isLoading = false;
      const { data, status } = actions.payload;
      if (status >= 400) {
        state.changePassword_isError = data;
      } else {
        state.changePassword_Data = data;
        state.changePassword_isError = "";
      }
    },
    [changePassword.rejected]: (state) => {
      state.changePassword_isLoading = false;
    },
  },
});
export default AuthSlice.reducer;
export const { clearChangePassword, logOut } = AuthSlice.actions;
