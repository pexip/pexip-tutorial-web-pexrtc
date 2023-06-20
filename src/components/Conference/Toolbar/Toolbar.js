import React, { useEffect, useState } from "react";

import Button from "./Button/Button";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import CallEndIcon from "@mui/icons-material/CallEnd";

import "./Toolbar.css";

function Toolbar(props) {
  // TODO (02) Define react state to save the audio muted state
  // TODO (03) Define react state to save the video muted state

  // TODO (04) Define the callback function for the audio mute button

  // TODO (05) Define the callback function for the video mute button

  const handleHangUp = () => {
    props.pexRTC.disconnect();
    props.pexRTC.onDisconnect();
  };

  const className = [props.className, "Toolbar"].join(" ");

  return (
    <div className={className}>
      {/* TODO (06) Create button to mute the audio */}
      {/* TODO (07) Create button to mute the video */}
      <Button onClick={handleHangUp} icon={<CallEndIcon />} />
    </div>
  );
}

export default Toolbar;
