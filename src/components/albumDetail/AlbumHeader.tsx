import { Box, Image, Heading, Text, HStack, VStack, Badge, Stack } from '@chakra-ui/react';
import { memo } from 'react';
import type { AlbumDetail } from '../../types/album';

interface AlbumHeaderProps {
  album: AlbumDetail;
}

export const AlbumHeader = memo(({ album }: AlbumHeaderProps) => {
  const imageUrl = album.image?.find((img) => img.size === 'extralarge' || img.size === 'mega')?.['#text'] || '';
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23718096'%3ENo Image%3C/text%3E%3C/svg%3E";
  const artistName = typeof album.artist === 'string' ? album.artist : album.artist.name;

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing={8}
      align={{ base: 'center', md: 'flex-start' }}
      w="100%"
    >
      <Box flexShrink={0}>
        <Image
          src={imageUrl || placeholderImage}
          alt={album.name}
          boxSize={{ base: '250px', md: '300px' }}
          objectFit="cover"
          borderRadius="lg"
          boxShadow="lg"
          fallbackSrc={placeholderImage}
        />
      </Box>
      
      <VStack align={{ base: 'center', md: 'flex-start' }} spacing={4} flex={1}>
        <Heading size="xl" textAlign={{ base: 'center', md: 'left' }}>
          {album.name}
        </Heading>
        <Text fontSize="2xl" color="gray.600" textAlign={{ base: 'center', md: 'left' }}>
          {artistName}
        </Text>
        
        <HStack spacing={4} flexWrap="wrap" justify={{ base: 'center', md: 'flex-start' }}>
          {album.playcount && (
            <Badge colorScheme="blue" fontSize="md" p={2}>
              {Number(album.playcount).toLocaleString()} plays
            </Badge>
          )}
          {album.listeners && (
            <Badge colorScheme="green" fontSize="md" p={2}>
              {Number(album.listeners).toLocaleString()} listeners
            </Badge>
          )}
        </HStack>

        {album.wiki?.summary && (
          <Text
            color="gray.700"
            noOfLines={4}
            textAlign={{ base: 'center', md: 'left' }}
            dangerouslySetInnerHTML={{
              __html: album.wiki.summary.replace(/<a[^>]*>.*?<\/a>/g, ''),
            }}
          />
        )}
      </VStack>
    </Stack>
  );
});

AlbumHeader.displayName = 'AlbumHeader';

