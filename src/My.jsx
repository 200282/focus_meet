import React , {Component , useContext , useEffect, useState} from "react";
import { Link , useLocation , useHistory, useNavigate} from "react-router-dom";
import { BrowserRouter,Router,Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import{getDatabase,ref,child,get,set,update,remove} from "firebase/database";

import { Form ,Button, Row ,Col } from "react-bootstrap";
import {m } from "./Focus";
import axios from "axios";

export function My({nam}){

    const navigate=useNavigate();
    const [user,setuser]=useState();
    const db=getDatabase();
       ;
    const [email,setemail]=useState(" ");
    const [id,setid]=useState("");
    const [reports,setreports]=useState([]);
    
  
   const v=[{roomid:"7772d0f4-1ba6-4860-83f5-de7b06caea93" ,  time:"12:05" },{roomid:"6da0d240-8160-4629-be7f-b2cd913c7a87" , time:"5:30" }]

useEffect(()=>{


axios.get("http://localhost:3006/user/"+nam)
.then(res=>{ console.log(res.data);
setemail(res.data.email.email);
setreports(res.data.report_ids);


}).catch(err=>{
    if(err)
        {console.log("error message : ", err);
            alert(err.response.data.message);
        }
});


  /*  const dbref=ref(db);
   
    setreports(v);
    get(child(dbref,'users/'+user)).then((snapshot)=>{
        if(snapshot.exists()){ 
   setnam(snapshot.val().username);
   setemail(snapshot.val().email);
           }
    else {}
    }).catch((e)=>{alert(e)});*/
},[])
    

 



    return(
        <React.Fragment>
             <m.Consumer>
        {(e)=>{setuser(e)}}
        </m.Consumer>   
        <div className="logo">  
        <br></br>
        <Row style={{margin:"1%" }}>

<Col style={{marginLeft:"4%" }}><div className="cir" style={{marginLeft:"10px", display:"inline-block"}}>
</div>
<h1 style={{ display:"inline-block",marginLeft:"2px"}}> EnGauge</h1>
 <br></br>
</Col>
<Col
className="sum" style={{border:"dashed",borderColor:"#d4b7ea"  }}><h4 style={{color:"#28a4bd"}}><center>My Account</center></h4>
<p style={{fontSize:"large"}}> Name : {nam}</p>
<p style={{fontSize:"large"}}> Email : {email}</p>
</Col>
</Row>
   
   <br></br>
   
   <br></br>
  <br></br>
   <center><div className="repo">Reports</div></center>
   <br></br>
   {reports.map((data,i)=>
   <ul  key={i}   className="divmy">
    <p style={{display:"inline-block" , margin:"12px"}}> {data.room_id}</p><span>{data.time}</span> 
   
    <Button className="but" 
    style={{backgroundColor:"#28a4bd" ,margin:"1%" ,borderColor:"#28a4bd"  ,float:"right" ,marginRight:"7px" }}
    onClick={()=>{
        navigate('/room/'+data.room_id+'/report', {replace:true} );
    
    }} >Open</Button>
  
    </ul>
  
)}
</div>
        </React.Fragment>
       
    )


}



//style={{borderColor:"#d7d2de" , backgroundColor:"#ebe8ef" , margin:"5px", fontSize:"large" }}