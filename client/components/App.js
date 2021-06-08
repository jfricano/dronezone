import React from 'react';
import { useState } from 'react';
import Display from './Display';
import Login from './Login';
import { ChakraProvider } from '@chakra-ui/react';
import '../../public/index.scss';

export default function App() {
  const [loginStatus, useLoginStatus] = useState(false);

  return (
    <ChakraProvider>
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
