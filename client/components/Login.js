import React from 'react';
import { Button, Container } from '@chakra-ui/react';

export default function Login(props) {
  return (
    <Container centerContent className='login-container'>
      <Button
        onClick={() => props.useLoginStatus(true)}
        style={{ backgroundColor: '#ffc815', color: '#292929' }}
      >
        Log in with Google
      </Button>
    </Container>
  );
}
