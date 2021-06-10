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
import Cookies from 'js-cookie';

export default function App() {
  const [loginStatus, useLoginStatus] = useState(false);
  const [email, useEmail] = useState(Cookies.get('email'));

  return (
    <ChakraProvider theme={theme}>
      <Box className='outer-container'>
        {email ? (
          <Display useEmail={useEmail} email={email} />
        ) : (
          <Login useEmail={useEmail} email={email} />
        )}
      </Box>
    </ChakraProvider>
  );
}
