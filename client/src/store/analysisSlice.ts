import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AnalysisResult } from '../types';
import { analyzeText } from '../api/client';

interface AnalysisState {
  inputText: string;
  result: AnalysisResult | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnalysisState = {
  inputText: '',
  result: null,
  loading: false,
  error: null,
};

export const analyzeAsync = createAsyncThunk(
  'analysis/analyze',
  async (text: string, { rejectWithValue }) => {
    try {
      const result = await analyzeText(text);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || error.message || 'Failed to analyze text'
      );
    }
  }
);

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setInputText: (state, action: PayloadAction<string>) => {
      state.inputText = action.payload;
    },
    clearResult: (state) => {
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
        state.error = null;
      })
      .addCase(analyzeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.result = null;
      });
  },
});

export const { setInputText, clearResult } = analysisSlice.actions;
export default analysisSlice.reducer;

