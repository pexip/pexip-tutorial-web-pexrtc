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
  return (
    <div className='Conference'>
      <Video className='remote-video' mediaStream={props.remoteStream}/>
      { props.localStream &&
        <Video className='local-video' mediaStream={props.localStream} muted={true}/>
      }
      <Toolbar className='toolbar' pexRTC={props.pexRTC} />
    </div>
  );
}

export default Conference;
