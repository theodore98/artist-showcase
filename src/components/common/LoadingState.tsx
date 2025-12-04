import { Flex, Spinner, Text } from '@chakra-ui/react';
import { memo } from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = memo(({ message = 'Loading...' }: LoadingStateProps) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="300px"
      gap={4}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text color="gray.600" fontSize="lg">
        {message}
      </Text>
    </Flex>
  );
});

LoadingState.displayName = 'LoadingState';

