import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { SearchMode, SearchResults } from '../types/search';
import { searchTracks, searchAlbums } from '../api/searchService';

interface SearchState {
  query: string;
  mode: SearchMode;
  results: SearchResults;
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  mode: 'tracks',
  results: [],
  isLoading: false,
  error: null,
};

export const search = createAsyncThunk(
  'search/search',
  async ({ query, mode }: { query: string; mode: SearchMode }) => {
    if (mode === 'tracks') {
      const results = await searchTracks(query);
      return { results, mode };
    } else {
      const results = await searchAlbums(query);
      return { results, mode };
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setMode: (state, action: PayloadAction<SearchMode>) => {
      state.mode = action.payload;
      state.results = [];
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.results;
      })
      .addCase(search.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Search failed';
      });
  },
});

export const { setQuery, setMode, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;

