import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";
import { ADD_A_VENDOR,GET_ALL_VENDOR,EDIT_A_VENDOR} from "./type";

export const addAVendor = createAsyncThunk(
  ADD_A_VENDOR,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/vendor/create`,payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getAVendor = createAsyncThunk(
  GET_ALL_VENDOR,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/vendor/getAll`,payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const editAVendor = createAsyncThunk(
  EDIT_A_VENDOR,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/vendor/update`,payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const VendorSlice = createSlice({
  name: "VendorSlice",
  initialState: {
    vendorData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorData = action.payload;
      })
      .addCase(getAVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default VendorSlice.reducer;
