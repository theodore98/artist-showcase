import { SimpleGrid } from '@chakra-ui/react';
import { memo } from 'react';
import type { Album } from '../../types/artist';
import { AlbumCard } from './AlbumCard';

interface AlbumGridProps {
  albums: Album[];
}

export const AlbumGrid = memo(({ albums }: AlbumGridProps) => {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      spacing={6}
      w="100%"
    >
      {albums.map((album, index) => {
        const artistName = typeof album.artist === 'string' ? album.artist : album.artist.name;
        return <AlbumCard key={`${album.name}-${artistName}-${index}`} album={album} />;
      })}
    </SimpleGrid>
  );
});

AlbumGrid.displayName = 'AlbumGrid';

