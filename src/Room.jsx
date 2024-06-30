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
import { Form ,Button, Image ,Col,Row, Table ,Alert , Modal} from "react-bootstrap";
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
   const myvideo=useRef(null);
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
 const [ch,setch]=useState(true);
 const [my,setmy]=useState();
 const[l,setl]=useState(true);
 const [user,setuser]=useState();
  const [message,setmessage]=useState([]);
 const [share,setshare]=useState(true);
 
useEffect(() => {
var i='';

 // socket.emit("message","good day");
 //socket.on("get_message",(m)=>{setmessage(m); console.log(m)});
  socket.on("getusers",(room)=>{
   const roomusers=room.filter(room=>room.rid===id&&room.uid!=me);
      console.log(roomusers);});

socket.on("end",(r)=>{
//alert("the meeting is ended",window.location.href='http://localhost:3000/');
setl(false);
  

});



socket.on("chat",(c)=>{
  
  
 setmessage(c.filter(room=>room.rid===id));
      console.log(message);
      setn('');
})

   peer.on("open",(idd)=>{
      socket.emit("join",id,idd);
     
      setme(idd);
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
 
  call.on("close",()=>{
    call.close(); 
   
    setvo(c=>c.filter(k=>k!==i));
    console.log("disconnect");
  
  //  setvi(c=>c.filter(k=>k!==userid));
  
     });
    
  
});

   
});

    },[id]);
const [k,setk]=useState(false);
 function tonewuser(userid,stream) {

            const call=peer.call(userid,stream);
           
               call.on("stream",(vs)=>{
               if(vs.active){
            
           uservideo.current.srcObject=vs;
           console.log("call in stream",userid);
           console.log("vs",uservideo.current.srcObject.active);
           
          } else{
            peer.destroy();
          }
         
         
              });
            
              setvi((c)=>[...c,userid]);
             
             console.log('vid',uservideo.current)
           //   vi.push(userid);
            console.log("vi",vi);
          console.log('userid',userid);
         console.log("call",call);
         
          call.on("close",()=>{
            call.close(); 
          //  setvi(c=>c.splice(c.indexOf(userid),1));
           setvi(c=>c.filter(k=>k!==userid));
            console.log("disconnect");
          
   //  setvi(c=>c.filter(k=>k!==userid));
       
             });
           



}     


const chat=()=>{
 
  setch((ch)=>!ch);
  console.log(chat);
}
const send=()=>{
  setn(my);
  socket.emit("chat",{rid:id,uid:me,m:my});


}



  
        const gotoreport=()=>{
         
          navigate('/room/'+id+'/report', {replace:true} );
       }
       const leave=()=>{
        //console.log();
       window.location.href='http://localhost:3000/'
      
      //    navigate('/', {replace:true} );
       }
       
       const End=()=>{
        
        socket.emit("end",id);
        window.location.href='http://localhost:3000/'
      
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
  var i='';
  if(share){
    setshare(false);
//const media=new MediaStream();
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
    // media.addTrack(track);
    i=track.id;
      }

         }); 
            
         

                });
   //setstream(stream);          
   //socket.emit("join",id,i);
   
  myvideo.current.srcObject = stream;
     


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

    
        {! l&&
        <center>
       
        <Alert  style={{margin:"0px",backgroundColor:"#000000",color:"#56c5cd"}}>
          <center>
          <h2>the meeting is ended</h2>
        <Button onClick={leave} style={{backgroundColor:"#56c5cd" , borderColor:"#56c5cd" }}>ok</Button>
        </center>
        </Alert>
        
        </center>}  
        <Row>
        
<Col>  
<div className="room">
<h1>
       <center>
    <div > welcome to room </div>
        </center>
</h1>

<center>
             <div>{id}</div>
                </center>
<h2 style={{textAlign:"left" , margin:"9px"}}>

  
  <Button variant="danger" style={{marginRight:"10px"}} onClick={End}>End</Button>
  
  <Button variant="danger" style={{marginRight:"10px"}} onClick={leave}>leave</Button>
  
  <Button variant="light" style={{marginRight:"10px"}} onClick={chat}>chat</Button>
  
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
      <div style={{display:"inline-block",border:"solid",borderColor:"#28a4bd",margin:"9px"}}>         
  
   <div >{user}</div>
  
      <video   className="video"
playsInline
muted
ref={myvideo}
autoPlay
style={{ width: "300px",margin:"3px" , display:"inline-block"}}


/>
</div>
{vi.map((data,i)=>{

return(

  <React.Fragment>
 <div style={{display:"inline-block",border:"solid",borderColor:"#28a4bd",margin:"9px"}}>
 <div >{data}</div>
     <video  className="video"
  key={i}
  playsInline
  
  ref={uservideo}
  autoPlay
  style={{ width: "300px" ,margin:"6px"  , display:"inline-block"}}
  /></div>
 </React.Fragment>
   )
   })}
    
    {vo.map((data,i)=>{

return(
  
  <React.Fragment>
    <div style={{display:"inline-block"  , border:"solid",borderColor:"#28a4bd",margin:"9px" }}>
  <div >{data}</div>
    <video  className="video"
  key={i}
  playsInline
  muted 
  ref={uservideo}
  autoPlay
  
  style={{ width: "300px"  ,display:"inline-block"  }}
  />
  </div>


 </React.Fragment>
   )
   })}
  


  
  

</div>
</Col>

{! ch&&
   <Col  xs={5} style={{borderColor:"#56c5cd" , border:"2px"}}>
  <center> <h3>chat</h3></center>
{message.map((d)=>{return(<div><div>{d.uid}</div><div>{d.m}</div><br></br></div>)})}
<div>{n}</div>
<div className="" style={{display:'inline'}}>
<Form.Control type="text" name="my" onChange={(e) => {
    setmy(e.target.value);
    }}   placeholder=" my message"></Form.Control>
 
 <Button  onClick={send} style={ {margin:"3px" ,borderColor:"#28a4bd" , backgroundColor:"#28a4bd", }}>send</Button>

  </div>

</Col>}


</Row>

  </React.Fragment>
    )


  }


  
   