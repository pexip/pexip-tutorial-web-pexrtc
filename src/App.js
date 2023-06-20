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
  PIN_REQUIRED: 'PIN_REQUIRED',
  PIN_OPTIONAL: 'PIN_OPTIONAL',
  ERROR: 'ERROR'
};

let pexRTC;

function App() {

  const [connectionState, setConnectionState] = useState(CONNECTION_STATE.DISCONNECTED);
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [presentationStream, setPresentationStream] = useState();
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
        pexRTC.onPresentation = handlePresentation;
        pexRTC.onPresentationConnected = handlePresentationConnected;
        pexRTC.onPresentationDisconnected = handlePresentationDisconnected;
        pexRTC.onScreenshareConnected = handleScreenshareConnected;
        pexRTC.onScreenshareStopped = handleScreenshareStopped;
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
    switch (pinStatus) {
      case 'none':
        pexRTC.connect();
        break;
      case 'required':
        setConnectionState(CONNECTION_STATE.PIN_REQUIRED);
        break;
      case 'optional':
        setConnectionState(CONNECTION_STATE.PIN_OPTIONAL);
        break;
      default:
        break;
    }
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

  const handlePresentation = (setting, presenter, uuid, presenter_source) => {
    if (setting) pexRTC.getPresentation();
  };

  const handlePresentationConnected = (stream) => {
    setPresentationStream(stream);
  };

  const handlePresentationDisconnected = (reason) => {
    if (!pexRTC.screenshare_requested) {
      setPresentationStream(null);
    }
  };

  const handleScreenshareConnected = (stream) => {
    setPresentationStream(stream);
  };

  const handleScreenshareStopped = (reason) => {
    setPresentationStream(null);
  };

  const handleStartConference = async (nodeDomain, conferenceAlias, displayName) => {
    setConnectionState(CONNECTION_STATE.CONNECTING);
    pexRTC = await getPexRTC(nodeDomain);
    pexRTC.makeCall(nodeDomain, conferenceAlias, displayName);
  };

  const handleSetPin = (pin) => {
    setConnectionState(CONNECTION_STATE.CONNECTING);
    pexRTC.connect(pin);
  };

  let component;
  switch (connectionState) {
    case CONNECTION_STATE.CONNECTING:
      component = <Loading />;
      break;
    case CONNECTION_STATE.PIN_REQUIRED:
      component = <Pin onSubmit={ handleSetPin } required={true}/>;
      break;
    case CONNECTION_STATE.PIN_OPTIONAL:
      component = <Pin onSubmit={ handleSetPin } required={false}/>;
      break;
    case CONNECTION_STATE.CONNECTED:
      component = (
        <Conference
          localStream={localStream}
          remoteStream={remoteStream}
          presentationStream={presentationStream}
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
