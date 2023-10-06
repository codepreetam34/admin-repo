import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";
import { GET_CATEGORY, GET_CATEGORY_CHILDREN, ADD_MAIN_CATEGORY, CATEGORY_BY_ID, DELETE_CATEGORY } from "./type";

export const getCategory = createAsyncThunk(
  GET_CATEGORY,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/category/getcategories`);
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
      console.log("payload ", payload.values());
      const response = await axiosInstance.post(`category/create`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const editMainCategory = createAsyncThunk(
  ADD_MAIN_CATEGORY,
  async (payload, thunkAPI) => {
    try {
      console.log("payload ", payload);
      const response = await axiosInstance.patch(`category/update`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getCategoryById = createAsyncThunk(
  CATEGORY_BY_ID,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `category/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);


export const deleteCategory = createAsyncThunk(
  DELETE_CATEGORY,
  async (idPayload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`category/delete`, {
        payload: idPayload,
      });

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
    addMainCategoryResponse: [],
    categoryByIdData: [],
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
    builder.addCase(addMainCategory.pending, (state) => {
      state.addMainCategoryResponse = [];
      state.isFetching = true;
      state.error = false;
    });

    builder.addCase(addMainCategory.fulfilled, (state, action) => {
      state.addMainCategoryResponse = action.payload?.data;
      state.isFetching = false;
      state.error = false;
    });
    builder.addCase(addMainCategory.rejected, (state, action) => {
      state.addMainCategoryResponse = [];
      state.isFetching = false;
      state.error = true;
    });

    ///////////////////
    builder.addCase(getCategoryById.pending, (state) => {
      state.getProductsListData = [];
      state.isFetching = true;
      state.error = false;
    });

    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.categoryByIdData = action.payload;
      state.isFetching = false;
      state.error = false;
    });
    builder.addCase(getCategoryById.rejected, (state, action) => {
      state.categoryByIdData = [];
      state.isFetching = false;
      state.error = true;
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
