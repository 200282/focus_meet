import React , {Component , useContext , useEffect, useState} from "react";
import { Link , useLocation , useHistory, useNavigate} from "react-router-dom";
import { BrowserRouter,Router,Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";

import {v4 as uuidv4} from "uuid";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Form ,Button, Row ,Col, Image} from "react-bootstrap";
import {m } from "./Focus";
import { My } from "./My";
const socket = io('http://localhost:5000/');
 

export function Meet({name}){

const navigate=useNavigate();    
const location=useLocation();
const [user,setuser]=useState()
const [room,setroom]=useState()
const roomid=uuidv4();
const id=uuidv4();
 

useEffect(() => {

   console.log(location);
    
},[]);
 



var create=()=>{
   
  //  socket.emit("create",roomid)
 // socket.emit("join",roomid,id);
    console.log("create")
    navigate('/room/'+roomid);}
    


var join=()=>{

  
   
   
    if(room){
     //   socket.emit("join",room,id);
        console.log("join");
        navigate('/room/'+room);
    }
    else {
        alert("please enter room id");
    }
}

  


const my_account=()=>{
   if(user){
   navigate('/meet/'+user);}
   else{
    alert("please login");
   }
}

    return(
        <React.Fragment>

       <m.Consumer>
        {(e)=>{setuser(e)}}
        </m.Consumer>     
            <div className="logo">
               
  
   <div style={{borderColor:"#28a4bd" , backgroundColor:"#28a4bd"  , margin:"0px" }}>
  <div className="circle"  onClick={my_account} style={{marginLeft:"10px", display:"inline-block"}}>
    <center>{user ?<h1>{user[0]}</h1>:<h1>?</h1>}</center></div> 
    
    <h2 style={{display:"inline-block",marginLeft:"5px"}}>{user}</h2> 
    <div className="log" style={{display:"inline-block",float:"right" , }}><br></br><br></br></div>
    </div>
   
   
   
    
<center>

    <Form >
        <h1>Hello</h1>
        <Form.Group>
  <Form.Label>room id  </Form.Label>
  <Form.Control type="text" name="room" onChange={(e) => {
    setroom(e.target.value);
    }}   placeholder=" Room id "></Form.Control>
   <span> </span>
   <br></br>
    <Button className="but" onClick={join} style={ {borderColor:"#28a4bd" , backgroundColor:"#28a4bd", }}>  join</Button>
    <br></br>
    <br></br>
    <br></br>
    <Button className="but" onClick={create} style={ {borderColor:"#28a4bd" , backgroundColor:"#28a4bd", }}>create meeting</Button>
  
<br></br>
 <a href="/login">login</a>

<a href="/signup">signup</a>
</Form.Group>
</Form>

</center>

<div className="gif" style={{marginLeft:"10%" ,marginBottom:"10%" , marginTop:"0px"}}></div>
</div>
 
    </React.Fragment>
    )
    

}