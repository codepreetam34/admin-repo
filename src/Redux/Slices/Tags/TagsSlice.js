import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";
import {
  TAGS_BY_ID,
  DELETE_TAGS,
  ADD_TAGS,
  GET_TAGS,
  UPDATE_TAGS,
} from "./type";

export const editTags = createAsyncThunk(
  UPDATE_TAGS,
  async (payload, thunkAPI) => {
    try {
      console.log("payload ", payload);
      const response = await axiosInstance.patch(`tags/update`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getTagsById = createAsyncThunk(
  TAGS_BY_ID,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`tags/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteTags = createAsyncThunk(
  DELETE_TAGS,
  async (idPayload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`tags/delete`, {
        payload: idPayload,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addTags = createAsyncThunk(ADD_TAGS, async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`/tags/create`, payload);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error });
  }
});

export const getTags = createAsyncThunk(GET_TAGS, async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/tags/getTags`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error });
  }
});

export const TagsSlice = createSlice({
  name: "CategorySlice",
  initialState: {
    tagsList: [],
    tagsByIdData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tagsList = action.payload;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });

    ///////////////////
    builder.addCase(getTagsById.pending, (state) => {
      state.tagsByIdData = [];
      state.isFetching = true;
      state.error = false;
    });

    builder.addCase(getTagsById.fulfilled, (state, action) => {
      state.tagsByIdData = action.payload;
      state.isFetching = false;
      state.error = false;
    });
    builder.addCase(getTagsById.rejected, (state, action) => {
      state.tagsByIdData = [];
      state.isFetching = false;
      state.error = true;
    });
    ///////////////////
  },
});

export default TagsSlice.reducer;
