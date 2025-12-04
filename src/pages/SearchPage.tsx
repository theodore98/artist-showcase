import { VStack, Heading, Text } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { search, setQuery, setMode, clearSearch } from '../store/searchSlice';
import { SearchForm } from '../components/search/SearchForm';
import { SearchResultsList } from '../components/search/SearchResultsList';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import type { SearchMode } from '../types/search';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const { query, mode, results, isLoading, error } = useAppSelector((state) => state.search);

  const handleQueryChange = (newQuery: string) => {
    dispatch(setQuery(newQuery));
  };

  const handleModeChange = (newMode: SearchMode) => {
    dispatch(setMode(newMode));
  };

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(search({ query: query.trim(), mode }));
    }
  };

  const handleClear = () => {
    dispatch(clearSearch());
  };

  const handleRetry = () => {
    if (query.trim()) {
      dispatch(search({ query: query.trim(), mode }));
    }
  };

  return (
    <VStack spacing={8} align="stretch" w="100%">
      <VStack spacing={4} align="stretch">
        <Heading size="xl">Search</Heading>
        <Text color="gray.600" fontSize="lg">
          Find your favorite tracks and albums
        </Text>
      </VStack>

      <SearchForm
        query={query}
        mode={mode}
        isLoading={isLoading}
        onQueryChange={handleQueryChange}
        onModeChange={handleModeChange}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      {isLoading && <LoadingState message={`Searching for ${mode}...`} />}

      {error && !isLoading && (
        <ErrorState message={error} onRetry={handleRetry} />
      )}

      {!isLoading && !error && query && results.length === 0 && (
        <EmptyState message={`No ${mode} found for "${query}"`} />
      )}

      {!isLoading && !error && results.length > 0 && (
        <VStack spacing={4} align="stretch">
          <Heading size="md">
            Found {results.length} {mode}
          </Heading>
          <SearchResultsList mode={mode} results={results} />
        </VStack>
      )}
    </VStack>
  );
}

