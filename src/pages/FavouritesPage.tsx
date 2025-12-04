import { useState, useMemo } from 'react';
import { VStack, Heading, Text, Box } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFavourite } from '../store/favouritesSlice';
import { FavouritesTable } from '../components/favourites/FavouritesTable';
import { FavouritesSearchBar } from '../components/favourites/FavouritesSearchBar';
import { EmptyState } from '../components/common/EmptyState';

export default function FavouritesPage() {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favourites.favourites);
  const [filterQuery, setFilterQuery] = useState('');

  const filteredFavourites = useMemo(() => {
    if (!filterQuery.trim()) {
      return favourites;
    }

    const query = filterQuery.toLowerCase();
    return favourites.filter(
      (fav) =>
        fav.name.toLowerCase().includes(query) ||
        fav.artist.toLowerCase().includes(query) ||
        (fav.album && fav.album.toLowerCase().includes(query))
    );
  }, [favourites, filterQuery]);

  const handleRemove = (id: string) => {
    dispatch(removeFavourite(id));
  };

  const handleClearFilter = () => {
    setFilterQuery('');
  };

  return (
    <VStack spacing={8} align="stretch" w="100%">
      <VStack spacing={4} align="stretch">
        <Heading size="xl">Favourites</Heading>
        <Text color="gray.600" fontSize="lg">
          Your collection of favorite tracks
        </Text>
      </VStack>

      {favourites.length === 0 ? (
        <EmptyState message="You haven't added any favourites yet. Start exploring and add some tracks!" />
      ) : (
        <>
          <Box maxW="600px">
            <FavouritesSearchBar
              value={filterQuery}
              onChange={setFilterQuery}
              onClear={handleClearFilter}
            />
          </Box>

          <VStack spacing={4} align="stretch">
            <Text fontWeight="semibold" fontSize="lg">
              {filteredFavourites.length} {filteredFavourites.length === 1 ? 'track' : 'tracks'}
              {filterQuery && ` matching "${filterQuery}"`}
            </Text>

            {filteredFavourites.length > 0 ? (
              <FavouritesTable
                favourites={filteredFavourites}
                onRemove={handleRemove}
              />
            ) : (
              <EmptyState message={`No favourites found matching "${filterQuery}"`} />
            )}
          </VStack>
        </>
      )}
    </VStack>
  );
}

