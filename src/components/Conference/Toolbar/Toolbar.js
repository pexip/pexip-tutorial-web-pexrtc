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

  const className = [props.className, "Toolbar"].join(" ");

  return (
    <div className={className}>
    </div>
  );
}

export default Toolbar;
