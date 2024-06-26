import React , {Component , useContext , useEffect, useState} from "react";
import { Link , useLocation , useHistory, useNavigate} from "react-router-dom";
import { BrowserRouter,Router,Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";

import {v4 as uuidv4} from "uuid";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Form ,Button } from "react-bootstrap";
import {m } from "./Focus";
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
  socket.emit("join",roomid,id);
    console.log("create")
    navigate('/room/'+roomid);}
    


var join=()=>{

    console.log("join");
    console.log(room);
    if(user){
    if(room){
        socket.emit("join",room,id);
        navigate('/room/'+room);
    }
    else {
        alert("please enter room id");
    }}
    else {
        alert("please login");
    }
  
}

    return(
        <React.Fragment>

       <m.Consumer>
        {(e)=>{setuser(e)}}
        </m.Consumer>     
            <div className="logo">
                <h1>
   <br></br>
    <center>
        <div>
    <h2>{user}</h2>

   </div></center></h1>
   
<center>
    <Form >
        <h1>Hello
        </h1>
        <Form.Group>
  <Form.Label>room id  </Form.Label>
  <Form.Control type="text" name="room" onChange={(e) => {
    setroom(e.target.value);
    }}   placeholder=" Room id "></Form.Control>
   <span> </span>
   <br></br>
    <Button className="but" onClick={join} style={ {borderColor:"#000000"}}>  join</Button>
    <br></br>
    <br></br>
    <br></br>
    <Button className="but" onClick={create} style={ {borderColor:"#000000"}}>create meeting</Button>
  
<br></br>
 <a href="/login">login</a>

<a href="/signup">signup</a>
</Form.Group>
</Form>
</center>
</div>
 <Button className="but" onClick={create} style={ {borderColor:"#000000"}}>create meeting</Button>
  
    </React.Fragment>
    )
    

}