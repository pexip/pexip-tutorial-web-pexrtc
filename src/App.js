import './App.css';
import { useState } from 'react';

import Preflight from './components/Preflight/Preflight';
import Loading from './components/Loading/Loading';
import Conference from './components/Conference/Conference';
import Pin from './components/Pin/Pin';
import Error from './components/Error/Error';

// TODO (01) Define a constant with all the possible states

// TODO (02) Define the variable that will store the pexRTC object

function App() {
  // TODO (03) Define react state to save the connection state
  // TODO (04) Define react state to save the local stream
  // TODO (05) Define react state to save the remote stream
  // TODO (06) Define react state to save the error text

  // TODO (07) Define a function that will load the PexRTC library dynamically

  // TODO (08) Define the callback function for Setup

  // TODO (09) Define the callback function for Connect

  // TODO (10) Define the callback function for Disconnect

  // TODO (11) Define the callback function for Error

  // TODO (12) Define the function that will be triggered to start the conference

  // TODO (13) Select the component to display depending on the connection state

  return (
    <div className="App" data-testid='App'>
      {/* TODO (14) Return the component that was selected */}
    </div>
  );
}

export default App;
