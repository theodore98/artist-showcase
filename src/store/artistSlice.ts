import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Album } from '../types/artist';
import { getTopAlbums } from '../api/artistService';

export type SortOption = 'name-asc' | 'name-desc' | 'year-asc' | 'year-desc';

interface ArtistState {
  artistName: string;
  albums: Album[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ArtistState = {
  artistName: 'Taylor Swift',
  albums: [],
  isLoading: false,
  error: null,
};

export const fetchAlbums = createAsyncThunk(
  'artist/fetchAlbums',
  async (artistName: string) => {
    const albums = await getTopAlbums(artistName);
    return { albums, artistName };
  }
);

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    setArtistName: (state, action: PayloadAction<string>) => {
      state.artistName = action.payload;
    },
    sortAlbums: (state, action: PayloadAction<SortOption>) => {
      const sortOption = action.payload;
      
      state.albums.sort((a, b) => {
        if (sortOption === 'name-asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortOption === 'name-desc') {
          return b.name.localeCompare(a.name);
        }
        // For year sorting, we don't have year in the Album type
        // We'll sort by playcount as a fallback
        if (sortOption === 'year-asc') {
          return (a.playcount || 0) - (b.playcount || 0);
        }
        if (sortOption === 'year-desc') {
          return (b.playcount || 0) - (a.playcount || 0);
        }
        return 0;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.isLoading = false;
        state.albums = action.payload.albums;
        state.artistName = action.payload.artistName;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch albums';
      });
  },
});

export const { setArtistName, sortAlbums } = artistSlice.actions;
export default artistSlice.reducer;

