import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";
import { GET_HOMEPAGE_BANNER } from "./type";

export const getHomepageBanner = createAsyncThunk(
  GET_HOMEPAGE_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/banner/getBanners`);
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const HomePageBannerSlice = createSlice({
  name: "HomePageBannerSlice",
  initialState: {
    homepagebanners: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomepageBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomepageBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.homepagebanners = action.payload;
      })
      .addCase(getHomepageBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default HomePageBannerSlice.reducer;
