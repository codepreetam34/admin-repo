import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";
import { GET_CATEGORY, GET_CATEGORY_CHILDREN, ADD_MAIN_CATEGORY } from "./type";

export const getCategory = createAsyncThunk(
  GET_CATEGORY,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/category/getCategory`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const getCategoryChildrens = createAsyncThunk(
  GET_CATEGORY_CHILDREN,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`category/getchildrens`, {
        id: payload,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addMainCategory = createAsyncThunk(
  ADD_MAIN_CATEGORY,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`category/create`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const CategorySlice = createSlice({
  name: "CategorySlice",
  initialState: {
    categoryList: [],
    ChidCategoryList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryList = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
    ///////////////////
    builder
      .addCase(getCategoryChildrens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryChildrens.fulfilled, (state, action) => {
        state.loading = false;
        state.ChidCategoryList = action.payload;
      })
      .addCase(getCategoryChildrens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default CategorySlice.reducer;
