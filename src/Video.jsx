import React , {Component , useContext , useEffect, useRef, useState} from "react";
import { Link , useNavigate} from 'react-router-dom';

export function Video(props){
  const uservideo=useRef();
  const peer = props.uid;

  useEffect(() => {
  //  peer.on('stream', (stream) => {
  //    uservideo.current.srcObject = stream;
  //  });
   
  }, [peer]);
 
  return(
    <video   className="video"
    playsInline
    muted
    ref={peer}
    autoPlay
    style={{ width: "300px",margin:"3px" , display:"inline-block"}}
    /> 
  )
}
