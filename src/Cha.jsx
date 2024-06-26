import React , {Component ,createElement, useContext , useEffect, useRef, useState , useReducer} from "react";
import {  Navigate, useParams ,useNavigate } from "react-router-dom";
import { Form ,Button, Image ,Col,Row, Table } from "react-bootstrap";

export function Cha(){
   const [chat,setchat]=useState(true);
   const [my,setmy]=useState();
   const [m,setm]=useState([]);
   const ch=()=>{
      setchat((ch)=>!ch);
      console.log(chat);
   }
const send=()=>{
   m.push(my);
   console.log(m);
}

   return(
<React.Fragment>
   <Row>
      <Col >
<div >
<h1>
       <center>
    <div > welcome to room </div>
    <Button onClick={ch}>v</Button>
        </center>
</h1>


</div>
</Col>

{! chat&&
   <Col >

{m.map((data)=>{return(<div>{data}</div>)})}
<div className="" style={{display:'inline'}}>
<Button className="but" onClick={send} style={ {borderColor:"#000000"}}>send</Button>
<Form.Control type="text" name="my" onChange={(e) => {
    setmy(e.target.value);
    }}   placeholder=" my message"></Form.Control>
  </div>

</Col>}

</Row>


  </React.Fragment>
  
    )
}