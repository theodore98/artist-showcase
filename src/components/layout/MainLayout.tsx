import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation, Outlet } from 'react-router-dom';
import { memo } from 'react';
import { routePaths } from '../../config/routes';

const NavLink = memo(({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const activeColor = useColorModeValue('blue.600', 'blue.300');
  const defaultColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <ChakraLink
      as={RouterLink}
      to={to}
      px={3}
      py={2}
      borderRadius="md"
      fontWeight={isActive ? 'bold' : 'medium'}
      color={isActive ? activeColor : defaultColor}
      bg={isActive ? useColorModeValue('blue.50', 'blue.900') : 'transparent'}
      _hover={{
        textDecoration: 'none',
        color: activeColor,
        bg: useColorModeValue('blue.50', 'blue.900'),
      }}
      transition="all 0.2s"
    >
      {children}
    </ChakraLink>
  );
});

NavLink.displayName = 'NavLink';

export const MainLayout = memo(() => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const pageBg = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box minH="100vh" bg={pageBg}>
      {/* Header */}
      <Box
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
        position="sticky"
        top={0}
        zIndex={10}
        boxShadow="sm"
      >
        <Container maxW="container.xl" py={4}>
          <Flex justify="space-between" align="center">
            <Heading size="lg" color="blue.600">
              Artist Showcase
            </Heading>
            <HStack spacing={2}>
              <NavLink to={routePaths.home}>Home</NavLink>
              <NavLink to={routePaths.search}>Search</NavLink>
              <NavLink to={routePaths.favourites}>Favourites</NavLink>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        <Outlet />
      </Container>
    </Box>
  );
});

MainLayout.displayName = 'MainLayout';

