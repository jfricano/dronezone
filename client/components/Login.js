import React from "react";
import { Button, Container } from "@chakra-ui/react";
import axios from "axios";

export default function Login(props) {
  return (
    <Container centerContent className="login-container">
      {/* <Button onClick={() => props.useLoginStatus(true)}> */}
      <Button>
        {/* below is for testing purposes - cannot be fetch */}
        <a href="/login">Log in with Google</a>
      </Button>
    </Container>
  );
}
