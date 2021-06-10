import React from 'react';
import { useState } from 'react';
import Display from './Display';
import Login from './Login';
import {
  ChakraProvider,
  useColorModeValue,
  useColorMode,
  CSSReset,
  Box,
} from '@chakra-ui/react';
import theme from '../../public/theme';
import '../../public/index.scss';

export default function App() {
  const [loginStatus, useLoginStatus] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      <Box className='outer-container'>
        {loginStatus ? (
          <Display useLoginStatus={useLoginStatus} />
        ) : (
          <Login useLoginStatus={useLoginStatus} />
        )}
      </Box>
    </ChakraProvider>
  );
}
