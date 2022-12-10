import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import countryCoordinates from '@utils/countryCoordinates'
import billionaireService from './billionaireService'
import { extractErrorMessage } from '@utils/extractErrorMessage'
 

export const setStateCountry = createAsyncThunk('country/set', async (place, thunkAPI) => {
  try {
    return billionaireService.setCountry(place)
  } catch (e) {
    return thunkAPI.rejectWithValue(extractErrorMessage(e))
  }
  
})

export const searchBillionairesByCountry = createAsyncThunk('billionaires/fetch',
async (country, thunkAPI) => {
  try {
    return await billionaireService.getBillionaires(country)
  } catch (e) {
    return thunkAPI.rejectWithValue(extractErrorMessage(e))
  }
})

export const getBillionaire = createAsyncThunk("billionaire/set", async (billionaire, thunkAPI) => {
  try {
    return await billionaireService.getBillionaire(billionaire)
  } catch (e) {
    return thunkAPI.rejectWithValue(extractErrorMessage(e))
  }
}) 

const initialState = {
  country: {
    country: 'United States',
    geoLocation: {
      lat: 37.09024,
      lng: -95.712891,
    },
    zoom: 3
  },
  billionaire: null,
  billionaires: [],
  isLoading: false,
  isError: false,
  message: '',
}

const billionaireDataSlice = createSlice({
  name: 'billionaireData',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBillionairesByCountry.fulfilled, (state, action) => {
        state.billionaires = action.payload
        state.isLoading = false
      })
      .addCase(searchBillionairesByCountry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchBillionairesByCountry.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
      })
      .addCase(setStateCountry.fulfilled, (state, action) => {
        state.country = action.payload
        state.isLoading = false
      })
      .addCase(setStateCountry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(setStateCountry.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
      })
      .addCase(getBillionaire.fulfilled, (state, action) => {
        state.billionaire = action.payload
        state.isLoading = false
      })
      .addCase(getBillionaire.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBillionaire.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
      })
      
  }
})

export default billionaireDataSlice.reducer

