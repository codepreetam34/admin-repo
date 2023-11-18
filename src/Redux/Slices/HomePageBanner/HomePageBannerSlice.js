import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";
import { GET_HOMEPAGE_BANNER, ADD_HOMEPAGE_BANNER, DELETE_HOMEPAGE_BANNER } from "./type";

export const getHomePageBanner = createAsyncThunk(
  GET_HOMEPAGE_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/banner/getBanners`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addHomepageBanner = createAsyncThunk(
  ADD_HOMEPAGE_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/banner/create`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editHomepageBanner = createAsyncThunk(
  ADD_HOMEPAGE_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/banner/update`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const deleteHomepageBanner = createAsyncThunk(
  DELETE_HOMEPAGE_BANNER,
  async (bannerId, thunkAPI) => {
    try {
      console.log("bannerId ",bannerId)
      const response = await axiosInstance.post(`/banner/delete`, bannerId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const HomePageBannerSlice = createSlice({
  name: "HomePageBannerSlice",
  initialState: {
    homePagebanners: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomePageBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomePageBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.homePagebanners = action.payload;
      })
      .addCase(getHomePageBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default HomePageBannerSlice.reducer;
