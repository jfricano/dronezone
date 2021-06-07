import React from 'react';

export default function Login(props) {
  return (
    <div>
      <button onClick={() => props.useLoginStatus(true)}>
        Log in with Google
      </button>
    </div>
  );
}
