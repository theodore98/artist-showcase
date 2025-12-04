import { memo } from 'react';
import { SearchBar } from '../common/SearchBar';

interface FavouritesSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const FavouritesSearchBar = memo(({
  value,
  onChange,
  onClear,
}: FavouritesSearchBarProps) => {
  return (
    <SearchBar
      value={value}
      onChange={onChange}
      onClear={onClear}
      placeholder="Filter favourites..."
    />
  );
});

FavouritesSearchBar.displayName = 'FavouritesSearchBar';

