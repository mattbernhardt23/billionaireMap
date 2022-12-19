import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import countryCoordinates from '@utils/countryCoordinates'
import billionaireService from "./billionaireService";
import { extractErrorMessage } from "@utils/extractErrorMessage";

export const setViewState = createAsyncThunk(
  "country/set",
  async (viewport, thunkAPI) => {
    try {
      return billionaireService.setViewState(viewport);
    } catch (e) {
      return thunkAPI.rejectWithValue(extractErrorMessage(e));
    }
  }
);

export const searchBillionairesByCountry = createAsyncThunk(
  "billionaires/fetch",
  async (country, thunkAPI) => {
    try {
      return await billionaireService.getBillionaires(country);
    } catch (e) {
      return thunkAPI.rejectWithValue(extractErrorMessage(e));
    }
  }
);

export const getBillionaire = createAsyncThunk(
  "billionaire/set",
  async (billionaire, thunkAPI) => {
    try {
      return await billionaireService.getBillionaire(billionaire);
    } catch (e) {
      return thunkAPI.rejectWithValue(extractErrorMessage(e));
    }
  }
);

export const createComment = createAsyncThunk(
  "comment/create",
  async (comment, thunkAPI) => {
    try {
      return await billionaireService.createComment(comment);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (comment, thunkAPI) => {
    try {
      return await billionaireService.deleteComment(comment);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  viewState: {
    latitude: 37.09024,
    longitude: -95.712891,
    zoom: 3,
  },
  billionaire: null,
  billionaires: [],
  isLoading: false,
  isError: false,
  message: "",
};

const billionaireDataSlice = createSlice({
  name: "billionaireData",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBillionairesByCountry.fulfilled, (state, action) => {
        state.billionaires = action.payload;
        state.isLoading = false;
      })
      .addCase(searchBillionairesByCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchBillionairesByCountry.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setViewState.fulfilled, (state, action) => {
        state.viewState = action.payload;
        state.isLoading = false;
      })
      .addCase(setViewState.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setViewState.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBillionaire.fulfilled, (state, action) => {
        state.billionaire = action.payload;
        state.isLoading = false;
      })
      .addCase(getBillionaire.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBillionaire.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default billionaireDataSlice.reducer;
