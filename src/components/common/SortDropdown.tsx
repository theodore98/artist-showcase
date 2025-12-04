import { Select } from '@chakra-ui/react';
import { memo } from 'react';
import type { SortOption } from '../../store/artistSlice';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown = memo(({ value, onChange }: SortDropdownProps) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      width="auto"
      bg="white"
      size="md"
    >
      <option value="name-asc">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
      <option value="year-asc">Playcount (Low to High)</option>
      <option value="year-desc">Playcount (High to Low)</option>
    </Select>
  );
});

SortDropdown.displayName = 'SortDropdown';

