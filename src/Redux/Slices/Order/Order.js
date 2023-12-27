import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";
import { ADD_ORDER, GET_ORDER, GET_ORDER_BY_ID, GET_ALL_ORDER } from "./type";

export const addOrder = createAsyncThunk(
  ADD_ORDER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/order/addOrder`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getOrders = createAsyncThunk(
  GET_ORDER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/order/getOrders`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const getAllOrders = createAsyncThunk(
  GET_ALL_ORDER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/order/getAllOrders`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const getOrderById = createAsyncThunk(
  GET_ORDER_BY_ID,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/order/getOrderById`, {
        id: payload,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const AllOrderSlice = createSlice({
  name: "AllOrderSlice",
  initialState: {
    getOrderDetails: {},
    getAllOrderDetails: {},
    getOrderDetailsById: {},
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.getOrderDetails = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.getOrderDetails = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.getOrderDetails = {};
      state.isFetching = false;
      state.isError = true;
    });

    builder.addCase(getAllOrders.pending, (state) => {
      state.getAllOrderDetails = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.getAllOrderDetails = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.getAllOrderDetails = {};
      state.isFetching = false;
      state.isError = true;
    });

    builder.addCase(getOrderById.pending, (state) => {
      state.getOrderDetailsById = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.getOrderDetailsById = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.getOrderDetailsById = {};
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default AllOrderSlice.reducer;
