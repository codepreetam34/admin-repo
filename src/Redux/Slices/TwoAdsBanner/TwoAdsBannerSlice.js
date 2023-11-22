import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";
import { GET_HOMEPAGE_TWO_ADS_BANNER, ADD_HOMEPAGE_TWO_ADS_BANNER, DELETE_HOMEPAGE_TWO_ADS_BANNER,EDIT_HOMEPAGE_TWO_ADS_BANNER } from "./type";

export const getHomePageTwoAdsBanner = createAsyncThunk(
  GET_HOMEPAGE_TWO_ADS_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/bannerTwoAds/getBanners`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addHomepageTwoAdsBanner = createAsyncThunk(
  ADD_HOMEPAGE_TWO_ADS_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/bannerTwoAds/create`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editHomepageTwoAdsBanner = createAsyncThunk(
  EDIT_HOMEPAGE_TWO_ADS_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/bannerTwoAds/update`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteHomepageTwoAdsBanner = createAsyncThunk(
  DELETE_HOMEPAGE_TWO_ADS_BANNER,
  async (bannerId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/bannerTwoAds/delete`, bannerId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const TwoAdsBannerSlice = createSlice({
  name: "TwoAdsBannerSlice",
  initialState: {
    twoAdsBanners: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomePageTwoAdsBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomePageTwoAdsBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.twoAdsBanners = action.payload;
      })
      .addCase(getHomePageTwoAdsBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default TwoAdsBannerSlice.reducer;
