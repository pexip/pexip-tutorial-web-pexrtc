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
  // TODO (09) Define react state to save the video that is displayed in the main region

  // TODO (10) Define function to change between the remote video and the presentation

  // TODO (11) Reset presentation in main once the other party stops sharing
  // TODO (12) Set the remote presentation on hte main section at the beginning

  return (
    <div className='Conference'>
      {/* TODO (13) Modify the remote video to toggle between it and the presentation */}
      <Video className='remote-video' mediaStream={props.remoteStream}/>
      { props.localStream &&
        <Video className='local-video' mediaStream={props.localStream} muted={true}/>
      }
      {/* TODO (14) Define the video for the presentation */}
      <Toolbar className='toolbar' pexRTC={props.pexRTC} />
    </div>
  );
}

export default Conference;
