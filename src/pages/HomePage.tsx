import { useEffect, useState } from 'react';
import {
  VStack,
  Heading,
  HStack,
  Input,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAlbums, setArtistName, sortAlbums, type SortOption } from '../store/artistSlice';
import { AlbumGrid } from '../components/albums/AlbumGrid';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { SortDropdown } from '../components/common/SortDropdown';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { artistName, albums, isLoading, error } = useAppSelector((state) => state.artist);
  const [inputValue, setInputValue] = useState(artistName);
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');

  useEffect(() => {
    // Fetch albums for default artist on mount
    if (albums.length === 0) {
      dispatch(fetchAlbums(artistName));
    }
  }, [dispatch, artistName, albums.length]);

  const handleSearch = () => {
    if (inputValue.trim()) {
      dispatch(setArtistName(inputValue.trim()));
      dispatch(fetchAlbums(inputValue.trim()));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSort = (option: SortOption) => {
    setSortOption(option);
    dispatch(sortAlbums(option));
  };

  const handleRetry = () => {
    dispatch(fetchAlbums(artistName));
  };

  return (
    <VStack spacing={8} align="stretch" w="100%">
      <VStack spacing={4} align="stretch">
        <Heading size="xl">Discover Albums</Heading>
        <Text color="gray.600" fontSize="lg">
          Explore albums from your favorite artists
        </Text>
      </VStack>

      {/* Search Section */}
      <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
        <VStack spacing={4}>
          <HStack w="100%" spacing={4}>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter artist name..."
              size="lg"
              disabled={isLoading}
            />
            <Button
              colorScheme="blue"
              size="lg"
              onClick={handleSearch}
              isLoading={isLoading}
              px={8}
            >
              Search
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* Results Section */}
      {!isLoading && albums.length > 0 && (
        <HStack justify="space-between" align="center">
          <Heading size="md">
            Albums by {artistName} ({albums.length})
          </Heading>
          <SortDropdown value={sortOption} onChange={handleSort} />
        </HStack>
      )}

      {/* Content */}
      {isLoading && <LoadingState message="Loading albums..." />}
      
      {error && !isLoading && (
        <ErrorState message={error} onRetry={handleRetry} />
      )}
      
      {!isLoading && !error && albums.length === 0 && (
        <EmptyState message="No albums found. Try searching for a different artist." />
      )}
      
      {!isLoading && !error && albums.length > 0 && (
        <AlbumGrid albums={albums} />
      )}
    </VStack>
  );
}

