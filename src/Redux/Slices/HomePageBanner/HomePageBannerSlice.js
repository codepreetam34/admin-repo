import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";
import { GET_HOMEPAGE_BANNER } from "./type";

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
