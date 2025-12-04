import { Flex, Text, Icon, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { SearchIcon } from '@chakra-ui/icons';

interface EmptyStateProps {
  message: string;
  icon?: React.ElementType;
}

export const EmptyState = memo(({ message, icon }: EmptyStateProps) => {
  const IconComponent = icon || SearchIcon;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="300px"
      p={8}
    >
      <VStack spacing={4}>
        <Icon as={IconComponent} boxSize={12} color="gray.400" />
        <Text color="gray.500" fontSize="lg" textAlign="center" maxW="500px">
          {message}
        </Text>
      </VStack>
    </Flex>
  );
});

EmptyState.displayName = 'EmptyState';

