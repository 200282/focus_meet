import React , {Component , useContext , useEffect, useState} from "react";
import { Link , useLocation , useHistory, useNavigate} from "react-router-dom";
import { BrowserRouter,Router,Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import{getDatabase,ref,child,get,set,update,remove} from "firebase/database";

import { Form ,Button, Row ,Col } from "react-bootstrap";
import {m } from "./Focus";

export function My({name}){

    const navigate=useNavigate();
    const [user,setuser]=useState();
    const db=getDatabase();
    const [nam,setnam]=useState("")    ;
    const [email,setemail]=useState(" ");
    const [id,setid]=useState("");
    const [reports,setreports]=useState([]);
    
  
   const v=[{roomid:"7772d0f4-1ba6-4860-83f5-de7b06caea93" ,  time:"12:05" },{roomid:"6da0d240-8160-4629-be7f-b2cd913c7a87" , time:"5:30" }]

useEffect(()=>{
    const dbref=ref(db);
   
    setreports(v);
    get(child(dbref,'users/'+user)).then((snapshot)=>{
        if(snapshot.exists()){ 
   setnam(snapshot.val().username);
   setemail(snapshot.val().email);
           }
    else {}
    }).catch((e)=>{alert(e)});},[])
    
 



    return(
        <React.Fragment>
             <m.Consumer>
        {(e)=>{setuser(e)}}
        </m.Consumer>   
        <div className="logo">  
        <br></br>

   <center>    <h1>Hi {user}</h1></center> 
   <br></br>
   <br></br>
 
   <Row  style={{fontSize:"large",margin:"9px"}}> <Col  style={{display:"inline-block" ,margin:"5px", backgroundColor:"#d4b7ea" ,marginLeft:"5px",border:"solid" ,borderColor:"#ebebc3" }}><center>{nam}</center></Col>
   <Col  style={{display:"inline-block" ,margin:"5px",marginRight:"5px", backgroundColor:"#d4b7ea",border:"solid" ,borderColor:"#ebebc3"}}><center>{email}</center></Col></Row>
   <br></br><br></br>
   <center><div className="repo">Reports</div></center>
   <br></br>
   {reports.map((data,i)=>
   <ul  key={i}   style={{borderColor:"#d7d2de" , backgroundColor:"#ebe8ef" , margin:"5px", fontSize:"large" }}>
    <p style={{display:"inline-block" , margin:"12px"}}> {data.roomid}</p><span>{data.time}</span> 
    <Button className="but" onClick={()=>{

navigate('/room/'+data.roomid+'/report', {replace:true} );
    


    }} style={ {borderColor:"#28a4bd" , backgroundColor:"#28a4bd", float:"right" , marginTop:"7px" , marginRight:"7px"}}>Open</Button>
  
    </ul>

)}</div>
        </React.Fragment>
       
    )


}