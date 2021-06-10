import React from "react";
import { Button, Container } from "@chakra-ui/react";

export default function Login(props) {
  return (
    <Container centerContent className="login-container">
      {/* <Button onClick={() => props.useLoginStatus(true)}> */}
      <Button onClick={() => fetch("/login", { mode: "no-cors" })}>
        Log in with Google
      </Button>
    </Container>
  );
}
