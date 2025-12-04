import { Input, InputGroup, InputLeftElement, InputRightElement, IconButton } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import { memo } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
  placeholder?: string;
  isLoading?: boolean;
}

export const SearchBar = memo(({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = 'Search...',
  isLoading = false,
}: SearchBarProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <InputGroup size="lg">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.400" />
      </InputLeftElement>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={isLoading}
        bg="white"
        _focus={{
          borderColor: 'blue.500',
          boxShadow: '0 0 0 1px blue.500',
        }}
      />
      {value && onClear && (
        <InputRightElement>
          <IconButton
            aria-label="Clear search"
            icon={<CloseIcon />}
            size="sm"
            variant="ghost"
            onClick={onClear}
            isDisabled={isLoading}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
});

SearchBar.displayName = 'SearchBar';

