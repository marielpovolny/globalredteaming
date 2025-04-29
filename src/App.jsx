import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import TabContent from './components/TabContent';
import './styles/global.css';

// Extend the theme to customize colors, fonts, etc.
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  colors: {
    brand: {
      50: '#E6F6FF',
      100: '#BAE3FF',
      200: '#7CC4FA',
      300: '#47A3F3',
      400: '#2186EB',
      500: '#0967D2',
      600: '#0552B5',
      700: '#03449E',
      800: '#01337D',
      900: '#002159',
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <TabContent />
    </ChakraProvider>
  );
}

export default App; 