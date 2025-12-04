import { Box, HStack, Text, IconButton, Badge, useColorModeValue } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { memo } from 'react';
import type { Track } from '../../types/album';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleFavourite } from '../../store/favouritesSlice';
import type { FavouriteTrack } from '../../types/track';

interface TrackRowProps {
  track: Track;
  albumName: string;
  artistName: string;
  index: number;
}

export const TrackRow = memo(({ track, albumName, artistName, index }: TrackRowProps) => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favourites.favourites);
  
  const trackId = `${artistName}-${albumName}-${track.name}`;
  const isFavourite = favourites.some((fav) => fav.id === trackId);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleFavourite = () => {
    const favourite: FavouriteTrack = {
      id: trackId,
      name: track.name,
      artist: artistName,
      album: albumName,
      duration: track.duration,
      playcount: track.playcount,
      url: track.url,
    };
    dispatch(toggleFavourite(favourite));
  };

  return (
    <Box
      bg={bgColor}
      p={4}
      borderRadius="md"
      _hover={{ bg: hoverBg }}
      transition="background 0.2s"
    >
      <HStack spacing={4} justify="space-between">
        <HStack spacing={4} flex={1}>
          <Text fontWeight="semibold" color="gray.500" minW="30px">
            {index + 1}
          </Text>
          <Box flex={1}>
            <Text fontWeight="medium" noOfLines={1}>
              {track.name}
            </Text>
          </Box>
        </HStack>
        
        <HStack spacing={4}>
          {track.playcount && (
            <Badge colorScheme="purple" display={{ base: 'none', md: 'block' }}>
              {Number(track.playcount).toLocaleString()} plays
            </Badge>
          )}
          {track.duration > 0 && (
            <Text color="gray.600" minW="45px" textAlign="right">
              {formatDuration(track.duration)}
            </Text>
          )}
          <IconButton
            aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
            icon={<StarIcon />}
            size="sm"
            variant="ghost"
            color={isFavourite ? 'yellow.400' : 'gray.400'}
            onClick={handleToggleFavourite}
            _hover={{
              color: 'yellow.500',
            }}
          />
        </HStack>
      </HStack>
    </Box>
  );
});

TrackRow.displayName = 'TrackRow';

