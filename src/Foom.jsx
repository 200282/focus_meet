import React , {Component ,createElement, useContext , useEffect, useRef, useState , useReducer} from "react";
import {  Navigate, useParams ,useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "peerjs"; 
import {v4 as uuidv4} from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
//import app from "./Config";
//import firbase from "firebase/app";
//import "firebase/firestore";
import { Form ,Button, Image } from "react-bootstrap";
import { Video } from "./Video";

const socket = io('http://localhost:5000/');
const ws=io(socket); 
//const firestore=firbase.firbase();
export function Room(){
   const navigate=useNavigate();
    const {id} =useParams();
   const [stream,setstream]=useState();
   const [me,setme]=useState();
   const myvideo=useRef();
   const uservideo=useRef();
 const meid=uuidv4();
 const md=uuidv4();
 const peer = new Peer(meid);
 const [n,setn]=useState();
 const [vi,setvi]=useState([{}]);//stream
 const [vo,setvo]=useState([{}]);//call
 const [mic,setmic]=useState(true);
 const [cam,setcam]=useState(true);
 const [user,setuser]=useState([{}]);
  


useEffect(() => {

 // socket.emit("message","good day");
//  socket.on("create_message",(m)=>{setn(m);});
  socket.on("getusers",(room)=>{
   const roomusers=room.filter(room=>room.rid===id);
      console.log(roomusers);});

   peer.on("open",(idd)=>{
      socket.emit("join",id,idd);
      setme(idd);
      console.log("id: ",idd);
     
             })   ; 
   
  navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(
   (stream)=>{
       
       if(myvideo.current){
      myvideo.current.srcObject = stream;
console.log("stream  :  ",stream);
          setstream(stream);
  }

  socket.on("user_connect",(userid)=>{

      tonewuser(userid,stream);
      console.log("user connect");
  
 });
 peer.on("call",(call)=>{

  call.answer(stream,id);
  call.on("stream",(vs)=>{
    if(uservideo.current){
      
           uservideo.current.srcObject=vs;
           console.log("call in  call",vs.id);
     setvo([...vo,[]]);
        console.log("vo:",vo)
    }

  });

  console.log("answer");

});
   

   
});

    },[]);

 function tonewuser(userid,stream) {

            const call=peer.call(userid,stream);
           
                call.on("stream",(vs)=>{
               if(uservideo.current){
           uservideo.current.srcObject=vs;
         
         setvi([...vi]);
         console.log("vi:",vi)
           console.log("call in stream",userid);

               
          } 
              });
        
          call.on("close",(st)=>{
        console.log("disconnect");
     
             });
        }

  
        
               

const gotoreport=()=>{
   navigate('/room/'+id+'/report', {replace:true} );
}

const End=()=>{

    navigate('/', {replace:true} );
}

const tog_mic=()=>{
  if(mic){
    setmic(false);
    stream.getTracks().forEach(function(track) {
      if(track.readyState==="live"&& track.kind==="audio")
      {track.enabled=false;}
      
    });
    
    }
    else {
      setmic(true);
    stream.getTracks().forEach(function(track) {
      if(track.readyState==="live"&& track.kind==="audio")
      {track.enabled=true;}
      
    });
    }
 
console.log("mic",mic);
}


const tog_cam=()=>{
  if(cam){
setcam(false);
stream.getTracks().forEach(function(track) {
  if(track.readyState==="live"&& track.kind==="video")
  {
    track.enabled=false;
  
  }
  
});

}
else {
  setcam(true);
stream.getTracks().forEach(function(track) {
  if(track.readyState==="live"&& track.kind==="video")
  {track.enabled=true;}
  
});
}
console.log("cam ",cam);
}

 

         return(
<React.Fragment>

<h1>
       <center>
    <div > welcome to room </div>
        </center>
</h1>

<center>
             <div>{id}</div>
                </center>
<h2 style={{textAlign:"left"}}>
<Button  className="but" style={ {borderColor:"#000000" , margin:"3px" }} onClick={gotoreport}> go to report</Button>
  <span></span> <span></span>
  <Button variant="danger" style={{marginRight:"10px"}} onClick={End}>End</Button>
  </h2>
        

  
<center>
  <h6 className="control">
<Button  onClick={tog_cam} style={ {borderColor:"#ffffff" ,margin:"3px" , backgroundColor:"white" }}><div className="cam">  {!cam&&<h1 >/</h1>}  </div> </Button>
<span></span> <span></span>
<Button  onClick={tog_mic} style={ {borderColor:"#ffffff" ,  backgroundColor:"white"}} ><div className="mic"> {!mic&&<h1 >/</h1>} </div> </Button>
                </h6>
                </center>
  <br></br>
                <div>{n}</div>
   <div>{me}</div>
  
      <video   className="video"
playsInline
muted
ref={myvideo}
autoPlay
style={{ width: "300px",margin:"3px" , display:"inline-block"}}
/>

{vi.map((data,i)=>{

return(

  <React.Fragment>
 <h3> stream {data.id}</h3>  
 
     <video  className="video"
  key={i}
  playsInline
  muted 
  ref={uservideo}
  autoPlay
  style={{ width: "300px" ,margin:"3px"  , display:"inline-block"}}
  />
 </React.Fragment>
   )
   })}
    
    {vo.map((data,i)=>{

return(
  
  <React.Fragment>
     <h3> call </h3> 

 
    <video  className="video"
  key={i}
  playsInline
  muted 
  ref={uservideo}
  autoPlay
  
  style={{ width: "300px" ,margin:"3px" ,display:"inline-block"  }}
  />
 </React.Fragment>
   )
   })}

   <div>
   <input type="text" ></input >
   <button onClick={send}>send</button>
   {messages.map(r=>{return(<h3 >{r.name}</h3>);  })}
   </div>
  
  
           
          
  </React.Fragment>
    )
}