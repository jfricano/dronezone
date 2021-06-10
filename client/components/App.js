import React from 'react';
import { useState } from 'react';
import Display from './Display';
import Login from './Login';
import {
  ChakraProvider,
  useColorModeValue,
  CSSReset,
  Box,
} from '@chakra-ui/react';
import theme from '../../public/theme';

import '../../public/index.scss';

export default function App() {
  const [loginStatus, useLoginStatus] = useState(false);

  return (
    <ChakraProvider theme={theme} resetCSS='true'>
      <Box className='outer-container' bg='blue'>
        {loginStatus ? (
          <Display useLoginStatus={useLoginStatus} />
        ) : (
          <Login useLoginStatus={useLoginStatus} />
        )}
      </Box>
    </ChakraProvider>
  );
}
