import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { MainLayout } from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import AlbumDetailPage from './pages/AlbumDetailPage';
import SearchPage from './pages/SearchPage';
import FavouritesPage from './pages/FavouritesPage';
import { routePaths } from './config/routes';
import { useInitialiseFavourites } from './hooks/useInitialiseFavourites';

const theme = extendTheme({
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  },
  colors: {
    brand: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

function AppContent() {
  useInitialiseFavourites();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={routePaths.albumDetail} element={<AlbumDetailPage />} />
          <Route path={routePaths.search} element={<SearchPage />} />
          <Route path={routePaths.favourites} element={<FavouritesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AppContent />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
