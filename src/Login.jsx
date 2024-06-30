import React , {Component , useContext , useEffect, useState} from "react";
import { Link , useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseConfig from "./Config";
import { Form ,Button } from "react-bootstrap";
import app from "./Config";
import firbase from "firebase/app";
import{getDatabase,ref,child,get,set,update,remove} from "firebase/database";


export function Login({getusername}){

    const navigate=useNavigate();
    const [username,setusername]=useState("");
    const [name,setname]=useState("");
    const [password,setpassword]=useState("");
    const db=getDatabase();
   const change_username=(event)=>{
        setusername(event.target.value);
         }
   const change_password=(event)=>{
            setpassword(event.target.value);
             }

 const login=()=>{
 
    const dbref=ref(db);
    get(child(dbref,'users/'+username)).then((snapshot)=>{
        if(snapshot.exists()&&password===snapshot.val().password){ 
          //  console.log(snapshot.val().password);
    getusername(username);
             navigate('/', {replace:true});}
    else {alert('not exist');}
    }).catch((e)=>{alert(e)});

 

}

    return(

<React.Fragment >
<div className="logo">
    <center>
    <Form>
        <Form.Group>
<h1><center>LOGIN</center></h1>
<center>
<div>
<Form.Label>username</Form.Label><Form.Control type="text" name="username" onChange={change_username} placeholder="Enter your username"></Form.Control>
<br></br>
<Form.Label>password</Form.Label><Form.Control type="password" name="password"  onChange={change_password} placeholder="Enter your password"></Form.Control>


</div>
<br></br>
</center>
<center><Button onClick={login} className="but" style={ {borderColor:"#28a4bd" , backgroundColor:"#28a4bd", }} >Login</Button></center>

<Form.Label style={{display:"inline-block"}}>Not a member ? </Form.Label> 
<a href="/signup">signup</a>
</Form.Group>

</Form>
</center>
</div>
</React.Fragment>


    )
}

