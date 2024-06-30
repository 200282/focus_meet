import React , {Component , useContext , useEffect, useState} from "react";
import { Meet } from "./Meet";
import { Link , useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form ,Button } from "react-bootstrap";
import app from "./Config";
import firbase from "firebase/app";
import{getDatabase,ref,child,get,set,update,remove} from "firebase/database";
export const usercontext=React.createContext()
var users=[{name:'',username:'',password:'',group:''}];

export function Sign(){
const [name,setname]=useState("")    ;
const [email,setemail]=useState(" ");
const [group,setgroup]=useState("");
const [password,setpassword]=useState("");
const [user,setuser]= useState([]);
const navigate=useNavigate();
const db=getDatabase();
useEffect(()=>{



},[]);




const change_name=(event)=>{
    setname(event.target.value);
     }
     const change_group=(event)=>{
        setgroup(event.target.value);
         }     
     const change_email=(event)=>{
        setemail(event.target.value);
         }
         const change_password=(event)=>{
            setpassword(event.target.value);
             }
         function generateuser(){
         users.push({name:name,email:email,password:password,group:group})
          console.log(users);
       
            }
            function go(){
                navigate('/login', {replace:true} );


            }    
const signupp= ()=>{

    const dbref=ref(db);
    get(child(dbref,'users/'+name)).then((snapshot)=>{
        if(!snapshot.exists()&& name && email &&password){ 
       
            set(ref(db,'users/'+name),{
                username: name,
                email:email,
                password:password
               
                
                }).then(()=>{
                   
                    {  go();}
                   
                
                }).catch((e)=>{
                    alert(e);
                });
    
            }
    else {alert('choose another username');}
    }).catch((e)=>{alert(e)});


}
   
    return(

<React.Fragment>
<div className="logo">
<center>
<Form>
    <Form.Group>
<h1><center>SIGN UP</center></h1>
<br></br>
<Form.Label> UserName </Form.Label><Form.Control type="text" name="name" onChange={change_name} required></Form.Control>
<br></br>
<Form.Label> Email </Form.Label><Form.Control type="text" name="username" onChange={change_email} required></Form.Control>
<br></br>
<Form.Label> Password </Form.Label><Form.Control type="password" name="password" onChange={change_password} required></Form.Control>
<br></br>
<center></center>


<br></br>
<center><Button className="but"  onClick={signupp}
style={ {borderColor:"#28a4bd" , backgroundColor:"#28a4bd", }}>Sign up</Button>
</center>
<br></br>

</Form.Group>
</Form>
</center>
</div>
</React.Fragment>
    )
}