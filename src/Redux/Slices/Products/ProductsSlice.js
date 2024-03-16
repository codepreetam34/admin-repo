import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "Services/AxiosInstance";
import {
  ADD_PRODUCTS,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORYID,
  VENDOR_PRODUCTS,
  VENDOR_PRODUCTS_APPROVAL,
} from "./type";

export const getProductsByCategoryId = createAsyncThunk(
  GET_PRODUCTS_BY_CATEGORYID,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `product/getProducts/categoryid`,
        { id: payload }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addProducts = createAsyncThunk(
  ADD_PRODUCTS,
  async (addProductData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `product/create`,
        addProductData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const updateProducts = createAsyncThunk(
  ADD_PRODUCTS,
  async (ProductData, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`product/update`, ProductData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getProducts = createAsyncThunk(
  GET_PRODUCTS,
  async (usersListData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`product/getProducts`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteProductById = createAsyncThunk(
  DELETE_PRODUCT,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `product/deleteProductById/${productId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const getVendorProducts = createAsyncThunk(
  VENDOR_PRODUCTS,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`product/vendor/get`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const getVendorProductsApproval = createAsyncThunk(
  VENDOR_PRODUCTS_APPROVAL,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `product/vendor/getAdminApproval`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const approvedBySuperAdmin = createAsyncThunk(
  VENDOR_PRODUCTS_APPROVAL,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `product/vendor/approvedBySuperAdmin`,
        { productId: productId }
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
    productsByCatId: [],
    addProductData: [],
    getVendorProductsApprovalData: [],
    productsList: [],
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
        state.productsByCatId = action.payload;
      })
      .addCase(getProductsByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });

    builder
      .addCase(getVendorProductsApproval.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVendorProductsApproval.fulfilled, (state, action) => {
        state.loading = false;
        state.getVendorProductsApprovalData = action.payload;
      })
      .addCase(getVendorProductsApproval.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });

    builder.addCase(addProducts.pending, (state) => {
      state.isFetching = true;
      state.error = false;
    });

    builder.addCase(addProducts.fulfilled, (state, action) => {
      state.addProductData = action.payload?.data;
      state.isFetching = false;
      state.error = false;
    });
    builder.addCase(addProducts.rejected, (state, action) => {
      state.isFetching = false;
      state.error = true;
    });
    builder.addCase(getProducts.pending, (state) => {
      state.isFetching = true;
      state.error = false;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.productsList = action.payload;
      state.isFetching = false;
      state.error = false;
    });

    builder.addCase(getProducts.rejected, (state, action) => {
      state.isFetching = false;
      state.error = true;
    });
  },
});

export default ProductsByCaregoryIdSlice.reducer;
