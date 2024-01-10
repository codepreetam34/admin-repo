import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";
import {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  DELETE_USER_BY_ID,
  EDIT_USER_BY_ID,
} from "./type";

export const getAllUsers = createAsyncThunk(
  GET_ALL_USERS,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/user/getAll`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getUsersById = createAsyncThunk(
  GET_USER_BY_ID,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/user/getUserById`, {
        id: payload,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteUserById = createAsyncThunk(
  DELETE_USER_BY_ID,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/user/delete`, id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editUserById = createAsyncThunk(
  EDIT_USER_BY_ID,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch("/user/update", payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const AllUserSlice = createSlice({
  name: "AllUserSlice",
  initialState: {
    getAllUserDetails: {},
    getUserDetailsById: {},
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.getAllUserDetails = {};
      state.isFetching = true;
      state.isError = false;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.getAllUserDetails = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.getAllUserDetails = {};
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(getUsersById.pending, (state) => {
      state.getUserDetailsById = {};
      state.isFetching = true;
      state.isError = false;
    });
    builder.addCase(getUsersById.fulfilled, (state, action) => {
      state.getUserDetailsById = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getUsersById.rejected, (state, action) => {
      state.getUserDetailsById = {};
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default AllUserSlice.reducer;
