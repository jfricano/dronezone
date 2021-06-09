import React from 'react';
import { useState } from 'react';
import Display from './Display';
import Login from './Login';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import '../../public/index.scss';

export default function App() {
  const [loginStatus, useLoginStatus] = useState(true);
  const theme = extendTheme({
    colors: {
      brand: {
        50: '#44337A',
        100: '#B794F4',
        500: '#ecec40', // you need this
      },
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <div className='outer-container'>
        {loginStatus ? (
          <Display useLoginStatus={useLoginStatus} />
        ) : (
          <Login useLoginStatus={useLoginStatus} />
        )}
      </div>
    </ChakraProvider>
  );
}
