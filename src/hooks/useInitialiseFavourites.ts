import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { loadFavouritesFromStorage } from '../store/favouritesSlice';

export function useInitialiseFavourites() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFavouritesFromStorage());
  }, [dispatch]);
}

