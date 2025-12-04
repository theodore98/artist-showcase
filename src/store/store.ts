import { configureStore } from '@reduxjs/toolkit';
import artistReducer from './artistSlice';
import albumReducer from './albumSlice';
import searchReducer from './searchSlice';
import favouritesReducer from './favouritesSlice';

export const store = configureStore({
  reducer: {
    artist: artistReducer,
    album: albumReducer,
    search: searchReducer,
    favourites: favouritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

