import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register, login } from "../../api";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const asyncRegister = createAsyncThunk(
  "auth/asyncRegister",
  async (formValues, thunkAPI) => {
    try {
      const { data } = await register(formValues);
      return data;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const asyncLogin = createAsyncThunk(
  "auth/asyncLogin",
  async (formValues, thunkAPI) => {
    try {
      const { data } = await login(formValues);
      return data;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [asyncLogin.pending]: (state) => {
      console.log("login pending!!");
      state.isLoading = true;
    },
    [asyncLogin.fulfilled]: (state, action) => {
      console.log("login succesfully!!");
      state.isLoading = false;
      state.isSuccess = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    [asyncLogin.rejected]: (state, action) => {
      console.log("login rejected!!");
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    },
    [asyncRegister.pending]: (state) => {
      console.log("register pending!!");
      state.isLoading = true;
    },
    [asyncRegister.fulfilled]: (state, action) => {
      console.log("register succesfully!!");
      state.isLoading = false;
      state.isSuccess = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    [asyncRegister.rejected]: (state, action) => {
      console.log("register rejected!!");
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    },
  },
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;
