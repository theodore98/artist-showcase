import { Box, HStack, Button, Tabs, TabList, Tab, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { SearchBar } from '../common/SearchBar';
import type { SearchMode } from '../../types/search';

interface SearchFormProps {
  query: string;
  mode: SearchMode;
  isLoading: boolean;
  onQueryChange: (query: string) => void;
  onModeChange: (mode: SearchMode) => void;
  onSearch: () => void;
  onClear: () => void;
}

export const SearchForm = memo(({
  query,
  mode,
  isLoading,
  onQueryChange,
  onModeChange,
  onSearch,
  onClear,
}: SearchFormProps) => {
  const tabIndex = mode === 'tracks' ? 0 : 1;

  const handleTabChange = (index: number) => {
    onModeChange(index === 0 ? 'tracks' : 'albums');
  };

  return (
    <VStack spacing={4} w="100%">
      <Tabs
        index={tabIndex}
        onChange={handleTabChange}
        variant="enclosed"
        colorScheme="blue"
        w="100%"
      >
        <TabList>
          <Tab>Tracks</Tab>
          <Tab>Albums</Tab>
        </TabList>
      </Tabs>

      <HStack w="100%" spacing={4}>
        <Box flex={1}>
          <SearchBar
            value={query}
            onChange={onQueryChange}
            onSearch={onSearch}
            onClear={onClear}
            placeholder={`Search for ${mode}...`}
            isLoading={isLoading}
          />
        </Box>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={onSearch}
          isLoading={isLoading}
          px={8}
        >
          Search
        </Button>
      </HStack>
    </VStack>
  );
});

SearchForm.displayName = 'SearchForm';

