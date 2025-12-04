import { VStack, Heading } from '@chakra-ui/react';
import { memo } from 'react';
import type { Track } from '../../types/album';
import { TrackRow } from './TrackRow';

interface TrackListProps {
  tracks: Track[];
  albumName: string;
  artistName: string;
}

export const TrackList = memo(({ tracks, albumName, artistName }: TrackListProps) => {
  return (
    <VStack align="stretch" spacing={4} w="100%">
      <Heading size="lg">Tracklist</Heading>
      <VStack align="stretch" spacing={2}>
        {tracks.map((track, index) => (
          <TrackRow
            key={`${track.name}-${index}`}
            track={track}
            albumName={albumName}
            artistName={artistName}
            index={index}
          />
        ))}
      </VStack>
    </VStack>
  );
});

TrackList.displayName = 'TrackList';

