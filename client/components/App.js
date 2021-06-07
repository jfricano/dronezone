import React from 'react';
import { useState } from 'react';
import Display from './Display';
import Login from './Login';
import '../../public/index.scss';

export default function App() {
  const [loginStatus, useLoginStatus] = useState(false);

  return (
    <div className='outer-container'>
      {loginStatus ? <Display /> : <Login useLoginStatus={useLoginStatus} />}
    </div>
  );
}
