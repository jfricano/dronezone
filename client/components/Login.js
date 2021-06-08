import React from 'react';
import { Button, Container } from '@chakra-ui/react';

export default function Login(props) {
  return (
    <Container centerContent className='login-container'>
      <Button colorScheme='blue' onClick={() => props.useLoginStatus(true)}>
        Log in with Google
      </Button>
    </Container>
  );
}
