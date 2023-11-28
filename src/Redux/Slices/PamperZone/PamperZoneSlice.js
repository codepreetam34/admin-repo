import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";
import { GET_HOMEPAGE_PAMER_ZONE_BANNER, ADD_HOMEPAGE_PAMER_ZONE_BANNER, DELETE_HOMEPAGE_PAMER_ZONE_BANNER, EDIT_HOMEPAGE_PAMER_ZONE_BANNER } from "./type";

export const getHomePagePamperZone = createAsyncThunk(
  GET_HOMEPAGE_PAMER_ZONE_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/bannerPamperZone/getBanners`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addHomepagePamperZone = createAsyncThunk(
  ADD_HOMEPAGE_PAMER_ZONE_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/bannerPamperZone/create`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editHomepagePamperZone = createAsyncThunk(
  EDIT_HOMEPAGE_PAMER_ZONE_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/bannerPamperZone/update`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteHomepagePamperZone = createAsyncThunk(
  DELETE_HOMEPAGE_PAMER_ZONE_BANNER,
  async (bannerId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/bannerPamperZone/delete`, bannerId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const PamperZoneSlice = createSlice({
  name: "PamperZoneSlice",
  initialState: {
    pamperZoneData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomePagePamperZone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomePagePamperZone.fulfilled, (state, action) => {
        state.loading = false;
        state.pamperZoneData = action.payload;
      })
      .addCase(getHomePagePamperZone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default PamperZoneSlice.reducer;
