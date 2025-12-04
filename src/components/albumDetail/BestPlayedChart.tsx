import { Box, Heading, Text, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import { memo } from 'react';
import type { Track } from '../../types/album';

interface BestPlayedChartProps {
  tracks: Track[];
}

export const BestPlayedChart = memo(({ tracks }: BestPlayedChartProps) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const barColor = useColorModeValue('blue.500', 'blue.300');

  // Filter tracks with playcount and sort by playcount
  const tracksWithPlaycount = tracks
    .filter((track) => track.playcount && track.playcount > 0)
    .sort((a, b) => (b.playcount || 0) - (a.playcount || 0))
    .slice(0, 10);

  if (tracksWithPlaycount.length === 0) {
    return null;
  }

  const maxPlaycount = tracksWithPlaycount[0]?.playcount || 1;

  return (
    <VStack align="stretch" spacing={4} w="100%" mt={8}>
      <Heading size="lg">Most Played Tracks</Heading>
      <Box bg={bgColor} p={6} borderRadius="lg">
        <VStack align="stretch" spacing={3}>
          {tracksWithPlaycount.map((track, index) => {
            const percentage = ((track.playcount || 0) / maxPlaycount) * 100;
            return (
              <VStack key={index} align="stretch" spacing={1}>
                <HStack justify="space-between">
                  <Text fontSize="sm" fontWeight="medium" noOfLines={1} flex={1}>
                    {track.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600" minW="80px" textAlign="right">
                    {(track.playcount || 0).toLocaleString()} plays
                  </Text>
                </HStack>
                <Box w="100%" h="8px" bg="gray.200" borderRadius="full" overflow="hidden">
                  <Box
                    h="100%"
                    w={`${percentage}%`}
                    bg={barColor}
                    transition="width 0.5s ease"
                  />
                </Box>
              </VStack>
            );
          })}
        </VStack>
      </Box>
    </VStack>
  );
});

BestPlayedChart.displayName = 'BestPlayedChart';

