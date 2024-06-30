import React, { useRef ,useState} from "react";
import { Link , Navigate, useParams ,useNavigate, Routes, Route,BrowserRouter} from "react-router-dom";
import { All } from "./All";
import { Student } from "./Student";
import { useReactToPrint } from "react-to-print";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import {m } from "./Focus";

export function Report({name}){
    
const printref=useRef();
    const navigate=useNavigate();
    const {id} =useParams();
    const [user,setuser]=useState()
    const print=useReactToPrint(
        {
            content:()=> printref.current,
            
        }
    );
    const back=()=>{
        navigate('/meet/'+user);
    }

       return(
        <React.Fragment>
  <m.Consumer>
        {(e)=>{setuser(e)}}
        </m.Consumer>  

<center>
    <h1 style={{color:"#28a4bd"}}>welcome to report page</h1>
</center >
            <div ref={printref} className="layout">


<All/>

</div>
<h2 style={{textAlign:"right"}}>
<Button className="but" onClick={print}  style={ {borderColor:"#28a4bd" , backgroundColor:"#28a4bd",}} >print </Button>  <span></span>
<Button className="but" onClick={back} style={ {borderColor:"#28a4bd" , backgroundColor:"#28a4bd",}}> Back to my account</Button>
</h2>
<br></br>
<br></br>
        </React.Fragment>
    )
}
