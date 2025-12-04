import { VStack, Box } from '@chakra-ui/react';
import { memo } from 'react';
import type { SearchMode } from '../../types/search';
import type { Album } from '../../types/artist';
import type { TrackSearchResult } from '../../types/track';
import { AlbumGrid } from '../albums/AlbumGrid';
import { TrackRow } from '../albumDetail/TrackRow';

interface SearchResultsListProps {
  mode: SearchMode;
  results: (TrackSearchResult | Album)[];
}

export const SearchResultsList = memo(({ mode, results }: SearchResultsListProps) => {
  if (mode === 'albums') {
    return <AlbumGrid albums={results as Album[]} />;
  }

  // Tracks mode
  const tracks = results as TrackSearchResult[];
  return (
    <VStack align="stretch" spacing={2} w="100%">
      {tracks.map((track, index) => {
        // Convert TrackSearchResult to Track for TrackRow component
        const trackData = {
          name: track.name,
          duration: 0,
          listeners: track.listeners,
          url: track.url,
        };
        return (
          <Box key={`${track.name}-${track.artist}-${index}`}>
            <TrackRow
              track={trackData}
              albumName=""
              artistName={track.artist}
              index={index}
            />
          </Box>
        );
      })}
    </VStack>
  );
});

SearchResultsList.displayName = 'SearchResultsList';

