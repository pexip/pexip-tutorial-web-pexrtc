import React, { useState, useEffect } from 'react';
import Toolbar from './Toolbar/Toolbar';

import './Conference.css';

const Video = React.memo((props) => {
  return <video className={props.className} autoPlay playsInline
    muted={ props.muted }
    onClick={ props.onClick }
    ref={ (element) => {
      if (element) element.srcObject = props.mediaStream;
    }}
  />
})

function Conference(props) {
  const [presentationInMain, setPresentationInMain] = useState();

  const switchVideos = (event) => {
    if (event.target.className === 'presentation-video') {
      setPresentationInMain(true);
    } else {
      setPresentationInMain(false);
    }
  }
  const memoizedSwitchVideos = React.useCallback(switchVideos , []);

  useEffect(() => {
    if (!props.presentationStream) {
      if (presentationInMain != null) setPresentationInMain(null);
    } else {
      if (presentationInMain == null && !props.pexRTC.screenshare_requested) {
        setPresentationInMain(true);
      }
    }
  }, [
    presentationInMain,
    props.localStream,
    props.pexRTC.screenshare_requested,
    props.presentationStream
  ]);

  const additionalClasses = presentationInMain ? ' presentation-in-main' : '';

  return (
    <div className={'Conference' + additionalClasses}>
      <Video className='remote-video'
         mediaStream={props.remoteStream} onClick={ memoizedSwitchVideos }/>
      { props.localStream &&
        <Video className='local-video' mediaStream={props.localStream} muted={true}/>
      }
      { props.presentationStream &&
        <Video className='presentation-video'
          mediaStream={props.presentationStream} onClick={ memoizedSwitchVideos }/>
      }
      <Toolbar className='toolbar' pexRTC={props.pexRTC} />
    </div>
  );
}

export default Conference;
