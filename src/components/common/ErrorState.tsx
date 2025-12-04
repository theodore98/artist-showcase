import { Flex, Text, Button, Icon, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { WarningIcon } from '@chakra-ui/icons';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = memo(({ message, onRetry }: ErrorStateProps) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="300px"
      p={8}
    >
      <VStack spacing={4}>
        <Icon as={WarningIcon} boxSize={12} color="red.500" />
        <Text color="red.600" fontSize="lg" textAlign="center" maxW="500px">
          {message}
        </Text>
        {onRetry && (
          <Button colorScheme="blue" onClick={onRetry} mt={4}>
            Try Again
          </Button>
        )}
      </VStack>
    </Flex>
  );
});

ErrorState.displayName = 'ErrorState';

