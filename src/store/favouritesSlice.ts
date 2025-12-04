import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FavouriteTrack } from '../types/track';

const STORAGE_KEY = 'artist-showcase-favourites';

interface FavouritesState {
  favourites: FavouriteTrack[];
}

const loadFromStorage = (): FavouriteTrack[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load favourites from localStorage:', error);
  }
  return [];
};

const saveToStorage = (favourites: FavouriteTrack[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  } catch (error) {
    console.error('Failed to save favourites to localStorage:', error);
  }
};

const initialState: FavouritesState = {
  favourites: loadFromStorage(),
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<FavouriteTrack>) => {
      const exists = state.favourites.some((fav) => fav.id === action.payload.id);
      if (!exists) {
        state.favourites.push(action.payload);
        saveToStorage(state.favourites);
      }
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter((fav) => fav.id !== action.payload);
      saveToStorage(state.favourites);
    },
    toggleFavourite: (state, action: PayloadAction<FavouriteTrack>) => {
      const index = state.favourites.findIndex((fav) => fav.id === action.payload.id);
      if (index >= 0) {
        state.favourites.splice(index, 1);
      } else {
        state.favourites.push(action.payload);
      }
      saveToStorage(state.favourites);
    },
    loadFavouritesFromStorage: (state) => {
      state.favourites = loadFromStorage();
    },
  },
});

export const {
  addFavourite,
  removeFavourite,
  toggleFavourite,
  loadFavouritesFromStorage,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;

