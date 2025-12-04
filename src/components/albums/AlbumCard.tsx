import { Box, Image, Text, VStack, Badge, useColorModeValue } from '@chakra-ui/react';
import { memo } from 'react';
import type { Album } from '../../types/artist';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';

interface AlbumCardProps {
  album: Album;
}

export const AlbumCard = memo(({ album }: AlbumCardProps) => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const imageUrl = album.image?.find((img) => img.size === 'extralarge' || img.size === 'large')?.['#text'] || '';
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23718096'%3ENo Image%3C/text%3E%3C/svg%3E";
  const artistName = typeof album.artist === 'string' ? album.artist : album.artist.name;

  const handleClick = () => {
    navigate(routes.albumDetail(artistName, album.name));
  };

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={handleClick}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
      }}
    >
      <Image
        src={imageUrl || placeholderImage}
        alt={album.name}
        width="100%"
        height="250px"
        objectFit="cover"
        fallbackSrc={placeholderImage}
      />
      <VStack align="stretch" p={4} spacing={2}>
        <Text fontWeight="bold" fontSize="md" noOfLines={2} minH="40px">
          {album.name}
        </Text>
        <Text fontSize="sm" color="gray.600" noOfLines={1}>
          {artistName}
        </Text>
        {album.playcount && (
          <Badge colorScheme="blue" width="fit-content">
            {Number(album.playcount).toLocaleString()} plays
          </Badge>
        )}
      </VStack>
    </Box>
  );
});

AlbumCard.displayName = 'AlbumCard';

