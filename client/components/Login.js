import React from 'react';
import { Button, Container } from '@chakra-ui/react';
import logo from '../../public/nektr-light-trans.png';
import axios from 'axios';

export default function Login(props) {
  return (
    <Container
      centerContent
      maxW='container.lg'
      className='login-container'
      style={{ textAlign: 'center', fontSize: '20px' }}
    >
      <img src={logo} style={{ width: '150px' }} />
      <br />
      <h1
        style={{
          fontSize: '35px',
          fontWeight: 'bold',
          color: '#ffc815',
          // textShadow: '2px 2px #292929ad',
          // WebkitTextStrokeColor: 'black',
          // WebkitTextStrokeWidth: '1px',
        }}
      >
        nektr is your one-stop job hunting resource.{' '}
      </h1>
      <br />
      The job hunt can be a tedious process, so allow nektr to take on some of
      the load. Once you log in with your Google account, you will have the
      ability to add, edit, and delete job applications as you are submitting
      them.
      <br />
      <Button
        // onClick={() => props.useLoginStatus(true)}
        style={{
          backgroundColor: '#ffc815',
          color: '#292929',
          marginTop: '30px',
        }}
      >
        Log In With Google
        {/* below is for testing purposes - cannot be fetch */}
        <a href='/login'>Log in with Google</a>
      </Button>
    </Container>
  );
}
