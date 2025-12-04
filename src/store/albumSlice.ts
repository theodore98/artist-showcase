import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AlbumDetail } from '../types/album';
import { getAlbumInfo } from '../api/albumService';

interface AlbumState {
  selectedAlbum: AlbumDetail | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AlbumState = {
  selectedAlbum: null,
  isLoading: false,
  error: null,
};

export const fetchAlbum = createAsyncThunk(
  'album/fetchAlbum',
  async ({ artistName, albumName }: { artistName: string; albumName: string }) => {
    const album = await getAlbumInfo(artistName, albumName);
    return album;
  }
);

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    clearSelectedAlbum: (state) => {
      state.selectedAlbum = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbum.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAlbum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedAlbum = action.payload;
      })
      .addCase(fetchAlbum.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch album';
      });
  },
});

export const { clearSelectedAlbum } = albumSlice.actions;
export default albumSlice.reducer;

