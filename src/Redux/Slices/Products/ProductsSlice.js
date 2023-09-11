import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";
import { GET_PRODUCTS_BY_CATEGORYID } from "./type";

export const getProductsByCategoryId = createAsyncThunk(
  GET_PRODUCTS_BY_CATEGORYID,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `product/getProducts/categoryid`,
        { id: "63e7408c4d118f475c8542c2" }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const ProductsByCaregoryIdSlice = createSlice({
  name: "ProductsByCaregoryIdSlice",
  initialState: {
    ProductsByCatId: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByCategoryId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.ProductsByCatId = action.payload;
      })
      .addCase(getProductsByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default ProductsByCaregoryIdSlice.reducer;
