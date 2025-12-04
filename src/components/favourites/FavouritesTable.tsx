import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { memo } from 'react';
import type { FavouriteTrack } from '../../types/track';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';

interface FavouritesTableProps {
  favourites: FavouriteTrack[];
  onRemove: (id: string) => void;
}

export const FavouritesTable = memo(({ favourites, onRemove }: FavouritesTableProps) => {
  const navigate = useNavigate();
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRowClick = (track: FavouriteTrack) => {
    if (track.album && track.artist) {
      navigate(routes.albumDetail(track.artist, track.album));
    }
  };

  return (
    <Box overflowX="auto" w="100%">
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Track Name</Th>
            <Th>Artist</Th>
            <Th>Album</Th>
            <Th isNumeric>Duration</Th>
            <Th isNumeric display={{ base: 'none', md: 'table-cell' }}>Playcount</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {favourites.map((track) => (
            <Tr
              key={track.id}
              _hover={{ bg: hoverBg, cursor: track.album ? 'pointer' : 'default' }}
              onClick={() => track.album && handleRowClick(track)}
            >
              <Td fontWeight="medium">{track.name}</Td>
              <Td>{track.artist}</Td>
              <Td>{track.album || '-'}</Td>
              <Td isNumeric>{formatDuration(track.duration)}</Td>
              <Td isNumeric display={{ base: 'none', md: 'table-cell' }}>
                {track.playcount ? track.playcount.toLocaleString() : '-'}
              </Td>
              <Td>
                <IconButton
                  aria-label="Remove from favourites"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(track.id);
                  }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
});

FavouritesTable.displayName = 'FavouritesTable';

