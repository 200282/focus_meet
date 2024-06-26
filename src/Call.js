import React , {Component ,createElement, useContext , useEffect, useRef, useState , useReducer} from "react";
import {  Navigate, useParams ,useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "peerjs"; 
import {v4 as uuidv4} from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import{getDatabase,ref,child,get,set,update,remove} from "firebase/database";
//import app from "./Config";
//import firbase from "firebase/app";
//import "firebase/firestore";
import { Form ,Button, Image } from "react-bootstrap";
import { Video } from "./Video";
import {m } from "./Focus";
const socket = io('http://localhost:5000/');
const ws=io(socket); 
//const firestore=firbase.firbase();
export function Room(){
 
   const navigate=useNavigate();
    const {id} =useParams();
   const [stream,setstream]=useState();
   const [me,setme]=useState();
   var currentPeer = null;
   var screenStream;
   const myvideo=useRef();
   const uservideo=useRef();
   const screen=useRef();
 const meid=uuidv4();
 const md=uuidv4();
 const peer = new Peer(meid);
 const [n,setn]=useState();
 const [vi,setvi]=useState([]);//stream
 const [vs,setvs]=useState([]);//screen
 const [vo,setvo]=useState([]);//call
 const [mic,setmic]=useState(true);
 const [cam,setcam]=useState(true);
 const [user,setuser]=useState();
  const [message,setmessage]=useState([]);
 const [share,setshare]=useState(true);
useEffect(() => {
var i='';
 // socket.emit("message","good day");
 socket.on("get_message",(m)=>{setmessage(m); console.log(m)});
  socket.on("getusers",(room)=>{
   const roomusers=room.filter(room=>room.rid===id);
      console.log(roomusers);});

   peer.on("open",(idd)=>{
      socket.emit("join",id,idd);
     
   
   //   console.log("id: ",idd);
     
             })   ; 
   
  navigator.mediaDevices.getUserMedia  ({video:true,audio:true}).then(
   (stream)=>{
   
       if(myvideo.current){
      myvideo.current.srcObject = stream;
console.log("stream  :  ",stream);
setstream(stream);
  }

  socket.on("user_connect",(userid)=>{

      tonewuser(userid,stream);
      setme(userid);
      console.log("user connect");
      
  
 });
 peer.on("call",(call)=>{
  i=call.peer;
console.log("cid",i);
  call.answer(stream,id);
 call.on("stream",(vs)=>{
    if(vs){
            uservideo.current.srcObject=vs;
           console.log("call in  call",call.peer);
   
    } });
  setvo((c)=>[...c,i]);
 //console.log("vo:",)
  console.log("answer");
  
  
  

    
  
});

   
});

    },[id]);

 function tonewuser(userid,stream) {

            const call=peer.call(userid,stream);
           
                call.on("stream",(vs)=>{
               if(vs.active){
           uservideo.current.srcObject=vs;
           console.log("call in stream",userid);
           console.log("vs",vs);
          } 
         
              });
              setvi((c)=>[...c,userid]);
           //   vi.push(userid);
          //    console.log("vi:1",vi);
         
          call.on("close",()=>{
       
            console.log("disconnect");
         call.close();   
   //  setvi(c=>c.filter(k=>k!==userid));
       
             });
    



}     

  
        const gotoreport=()=>{
         
          navigate('/room/'+id+'/report', {replace:true} );
       }
       const leave=()=>{
        //console.log();

           navigate('/', {replace:true} );
       }
       
       const End=()=>{
        console.log(peer.connections);

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
        {track.enabled=false; 
       
        }
              });  }
      else {
        setcam(true);
      stream.getTracks().forEach(function(track) {
        if(track.readyState==="live"&& track.kind==="video")
        {track.enabled=true;}
           });    }
      console.log("cam ",cam);
      }
      
 const share_screen=()=>{
  if(share){
    setshare(false);

   
     stream.getTracks().forEach(function(track) {
      if(track.readyState==="live"&& track.kind==="video")
      {  console.log(track);
        
        stream.removeTrack(track);
      

      }
         });
 navigator.mediaDevices.getDisplayMedia({video:true,audio:true}).then(
  
  (sstream)=>{
   
    
     
    sstream.getTracks().forEach(function(track) {
      if(track.readyState==="live"&& track.kind==="video")
      {
       stream.addTrack(track);
    
       
      }
         }); 
              
                });
 
                
   myvideo.current.srcObject = stream;
   

console.log(stream);

}
else{
  setshare(true);
  navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(
    (stream)=>{
     setstream(stream);
          myvideo.current.srcObject = stream;
        
                  });


 }

}
 

  






  return(
<React.Fragment>
<m.Consumer>
        {(e)=>{setuser(e)}}
        </m.Consumer>  
  <div>
<div className="room">
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
  
  <Button variant="danger" style={{marginRight:"10px"}} onClick={leave}>leave</Button>
  </h2>
        

  
<center>
  <h6 className="control">
<Button  onClick={tog_cam} style={ {borderColor:"#ffffff" ,margin:"3px" , backgroundColor:"white" }}><div className="cam">  {!cam&&<h1 >/</h1>}  </div> </Button>
<span></span> <span></span>
<Button  onClick={tog_mic} style={ {borderColor:"#ffffff" ,  backgroundColor:"white"}} ><div className="mic"> {!mic&&<h1 >/</h1>} </div> </Button>
<Button  onClick={share_screen} style={ {borderColor:"#ffffff" ,  backgroundColor:"white"}} ><div className="share">{share&&<h1>/</h1>} </div> </Button>
      
                </h6>
                </center>
  <br></br>
               
   <div>{user}</div>
  
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
 
 
     <video  className="video"
  key={i}
  playsInline
  
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
  


  
  

</div>

<div style={{backgroundColor:"blue" , color:"red"}}>ddddddd</div>
</div>
  </React.Fragment>
    )


  }


  
   