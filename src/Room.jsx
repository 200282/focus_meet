import React , {Component ,createElement, useContext , useEffect, useRef, useState , useReducer} from "react";
import {  Navigate, useParams ,useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "peerjs"; 
import {v4 as uuidv4} from 'uuid';
import html2canvas from "html2canvas";
import 'bootstrap/dist/css/bootstrap.min.css';
import{getDatabase,ref,child,get,set,update,remove} from "firebase/database";
//import app from "./Config";
//import firbase from "firebase/app";
//import "firebase/firestore";
import captureVideoFrame from "capture-video-frame";
import { Form ,Button, Image ,Col,Row, Table ,Alert , Modal} from "react-bootstrap";
import { Video } from "./Video";
import {m } from "./Focus";
import axios from "axios";

const socket = io('http://localhost:5000/');
const ws=io(socket); 
//const firestore=firbase.firbase();


export function Room({nam}){
 
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
 const [user,setuser]=useState();
 const peer = new Peer(nam);
 const [c,setc]=useState(true);
 const [n,setn]=useState([]);
 const [vi,setvi]=useState([]);//stream
 const [vs,setvs]=useState([]);//screen
 const [vo,setvo]=useState([]);//call
 const [mic,setmic]=useState(true);
 const [cam,setcam]=useState(true);
 const [ch,setch]=useState(true);
 const [my,setmy]=useState();
 const[l,setl]=useState(true);
 const[s,sets]=useState(true);
 
  const [message,setmessage]=useState([]);
 const [share,setshare]=useState(true);
 
 var date =new Date();

 

useEffect(() => {
var i='';
console.log("n is",n);
console.log("my name",nam);

axios.get("http://localhost:3006/user/room/"+id)
.then(res=>{ console.log("name: ",res);


if(res.data.host===nam){setc(true);}
else {setc(false);}


}).catch(err=>{
    if(err)
        {console.log("error message : ", err);
           console.log("cant find name")
        }
});




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
      setn([]);
});

socket.on("share",(vst)=>{
  if(vst){
    console.log("share stream",vst);
    setstream(vst);
  alert("share");
  screen.current.srcObject=stream;
  sets(false);}

});


   peer.on("open",(idd)=>{
    
     socket.emit("join",id,idd);
     console.log("peer",peer)
     setme(idd);
     
     
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




// take image 






    },[id]);
const [k,setk]=useState(false);
 function tonewuser(userid,stream) {

            const call=peer.call(userid,stream);
           
               call.on("stream",(vs)=>{
               if(vs.active){
            
           uservideo.current.srcObject=vs;
           console.log("call in stream",userid);
           console.log("vs",uservideo.current.srcObject.active);
           
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

      //image




}     


const chat=()=>{
 
  setch((ch)=>!ch);
  console.log(chat);
}
const send=()=>{
  setn([...n,my]);
  socket.emit("chat",{rid:id,uid:me,m:my});
console.log(message);
console.log("n is",n);


}



  
        const gotoreport=()=>{
         
          navigate('/room/'+id+'/report', {replace:true} );
       }


       const leave=(e)=>{
        //console.log();
      // window.location.href='http://localhost:3000/'
      

      e.preventDefault();
 console.log("username:",nam, " id:",id," time:",date)
      axios.post("http://localhost:3006/record/leave",
       {"username":nam,"room_id":id,"timestamp":date})
       .then(res =>{
         console.log(res.data);
        window.location.href='http://localhost:3000/'
        
   }).
   catch (err => {
     
       if(err)
       {console.log("error message : ", err);
           alert(err.response.data.message);
       }
   });

      //    navigate('/', {replace:true} );
       }
       
       const End=(e)=>{
        
        socket.emit("end",id);
        window.location.href='http://localhost:3000/';
      /*
        e.preventDefault();
        console.log("username:",nam, " id:",id," time:",date)
             axios.post("http://localhost:3006/end",
              {"username":nam,"room_id":id,"timestamp":date})
              .then(res =>{
                console.log(res.data);
               window.location.href='http://localhost:3000/'
               
          }).
          catch (err => {
            
              if(err)
              {console.log("error message : ", err);
                  alert(err.response.data.message);
              }
          });

*/

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
 
//take images 


const take=(e)=>{
 // e.preventDefault();
  const ele=document.getElementById("my");
  html2canvas(ele).then((c)=>{
      let image=c.toDataURL("image/jpeg");
      console.log("screeeeeeeeeen");
      console.log("image : ",image);
  //  const a=document.createElement("a");
  //  a.href=image;
  //  a.download="capture.jpeg";
  //  a.click();
  const imm= image.replace("data:image/jpeg;base64,","");
        console.log("ccc: ",imm);
 console.log("username:",nam, " id:",id," time:",date)
      axios.post("http://localhost:3006/frame",
       {"username":nam,"room_id":id,"timestamp":date,"base64_image":imm })
       .then(res =>{
         console.log(res.data);
              
   }).
   catch (err => {
     
       if(err)
       {console.log("error message : ", err);
          console.log("fffffffffffffffff"); 
       }
   });


  
  })
}
/*
if(c){
setInterval(take, 60000);
}

*/




  return(
<React.Fragment>
<m.Consumer>
        {(e)=>{setuser(e)}}
        </m.Consumer>

    
        {! l&&
        <center>
       
        <Alert  style={{margin:"0px",backgroundColor:"#ebe8ef",color:"#28a4bd"}}>
          <center>
          <h2>the meeting is ended</h2>
        <Button onClick={leave} style={{backgroundColor:"#28a4bd" , borderColor:"#28a4bd" }}>ok</Button>
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

  
 {c && <Button variant="danger" style={{marginRight:"10px"}} onClick={End}>End</Button>}
  
  {!c &&<Button variant="danger" style={{marginRight:"10px"}} onClick={leave}>leave</Button>}
  
  
  </h2>
        

  
<center >
  <h6 className="control">
<Button  onClick={tog_cam} style={ {borderColor:"#ffffff" ,margin:"3px" , backgroundColor:"white" }}><div className="cam">  {!cam&&<h1 >/</h1>}  </div> </Button>
<span></span> <span></span>
<Button  onClick={tog_mic} style={ {borderColor:"#ffffff" ,  backgroundColor:"white"}} ><div className="mic"> {!mic&&<h1 >/</h1>} </div> </Button>
<Button  onClick={share_screen} style={ {borderColor:"#ffffff" ,  backgroundColor:"white"}} ><div className="share">{share&&<h1>/</h1>} </div> </Button>
<Button  style={{backgroundColor:"#ffffff" , borderColor:"#ca9deb" , margin:"10px",color:"#ca9deb" 
, fontSize:"large" ,fontWeight:"bolder" , border:"solid"
, float:"right"}}
 onClick={chat}>chat</Button>
  
  
                </h6>
                </center>
  <br></br>
{!s&&
  <div style={{display:"inline-block",border:"solid",borderColor:"#d4b7ea",margin:"9px"}}>         
  
  <div >share screen</div>
 
     <video   className="video"
playsInline
muted
ref={screen}
autoPlay
style={{ width: "500px",margin:"3px" , display:"inline-block"}}


/>
</div>}

      <div className="bv" style={{display:"inline-block",border:"solid",borderColor:"#d4b7ea",margin:"9px"}}>         
  <center><div >{user}</div></center>
   
  
      <video  id="my"  className="video"
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
 <div className="bv" style={{display:"inline-block",border:"solid",borderColor:"#28a4bd",margin:"9px"}}>
 <center><div >{data}</div></center>
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
    <div className="bv" style={{display:"inline-block"  , border:"solid",borderColor:"#28a4bd",margin:"9px" }}>
    <center><div >{data}</div></center>
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
  <center> <h3 style={{color:"#28a4bd"}}>chat</h3></center>

{message.map((d,i)=>{return(<div key={i} style={{}}>
<div className="nam">{d.uid}</div>
<div className="message">{d.m}</div>
<br></br>
</div>)})}

{n.map((data)=>{return(<div style={{}}>
  <div className="nam">{me}</div>
<div className="message">{data}</div>
<br></br>
</div>)})}

<br></br>
<br></br>
<br></br>
<div className="box">
 <div className="m">
<Form.Control  
type="text" name="my" onChange={(e) => {
    setmy(e.target.value);
    }}   placeholder=" my message"
    
    ></Form.Control>
 </div>
 <Button  onClick={send} style={ {margin:"3px" ,borderColor:"#28a4bd" , backgroundColor:"#28a4bd",display:"inline-block" }}>send</Button>

  </div>

</Col>}


</Row>

  </React.Fragment>
    )


  }


  
   