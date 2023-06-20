import './App.css';
import { useState } from 'react';

import Preflight from './components/Preflight/Preflight';
import Loading from './components/Loading/Loading';
import Conference from './components/Conference/Conference';
import Pin from './components/Pin/Pin';
import Error from './components/Error/Error';

const CONNECTION_STATE = {
  DISCONNECTED: 'DISCONNECTED',
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
  // TODO (01) Add state for PIN_REQUIRED
  // TODO (02) Add state for PIN_OPTIONAL
  ERROR: 'ERROR'
};

let pexRTC;

function App() {

  const [connectionState, setConnectionState] = useState(CONNECTION_STATE.DISCONNECTED);
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [error, setError] = useState('');

  const getPexRTC = async (nodeDomain) => {
    return new Promise((resolve, reject) => {
      const pexRTCId = 'pexrtc-library';
      // Remove a previous library if any
      const pexRTCScript = document.getElementById(pexRTCId);
      if (pexRTCScript) pexRTCScript.remove();
      // Attach the new library
      const script = document.createElement('script');
      script.id = 'pexrtc-library';
      script.type = 'text/javascript';
      script.src = `https://${nodeDomain}/static/webrtc/js/pexrtc.js`;
      script.onload = function () {
        const pexRTC = new window.PexRTC();
        pexRTC.onSetup = handleSetup;
        pexRTC.onConnect = handleConnect;
        pexRTC.onDisconnect = handleDisconnect;
        pexRTC.onError = handleError;
        resolve(pexRTC);
      };
      script.onerror = () => {
        reject(new Error('Cannot get PexRTC'));
      }
      document.body.appendChild(script);
      window.addEventListener("beforeunload", (event) => {
        pexRTC.disconnect();
      });
    });
  };

  const handleSetup = (localStream, pinStatus) => {
    setLocalStream(localStream);
    pexRTC.connect();
    // TODO (03) Connect directly only when a PIN is not required
    // TODO (04) Change the connection state to PIN_REQUIRED depending on pinStatus
    // TODO (05) Change the connection state to PIN_OPTIONAL depending on pinStatus
  };

  const handleConnect = (remoteStream) => {
    setRemoteStream(remoteStream);
    setConnectionState(CONNECTION_STATE.CONNECTED);
  };

  const handleDisconnect = (reason) => {
    setConnectionState(CONNECTION_STATE.DISCONNECTED);
  };

  const handleError = (error) => {
    setConnectionState(CONNECTION_STATE.ERROR);
    setError(error)
  };

  const handleStartConference = async (nodeDomain, conferenceAlias, displayName) => {
    setConnectionState(CONNECTION_STATE.CONNECTING);
    pexRTC = await getPexRTC(nodeDomain);
    pexRTC.makeCall(nodeDomain, conferenceAlias, displayName);
  };

  // TODO (06) Define the function that will be triggered once we put the PIN

  let component;
  switch (connectionState) {
    case CONNECTION_STATE.CONNECTING:
      component = <Loading />;
      break;
    // TODO (07) Check if we should display the PIN component with the required attribute
    // TODO (08) Check if we should display the PIN component without the required attribute
    case CONNECTION_STATE.CONNECTED:
      component = (
        <Conference
          localStream={localStream}
          remoteStream={remoteStream}
          pexRTC={pexRTC}
        />
      );
      break;
    case CONNECTION_STATE.ERROR:
      component = <Error message={error} onClose={() => setConnectionState(CONNECTION_STATE.DISCONNECTED)}/>;
      break;
    default:
      component = <Preflight onSubmit={ handleStartConference }/>;
      break;
  }

  return (
    <div className="App" data-testid='App'>
      {component}
    </div>
  );
}

export default App;
