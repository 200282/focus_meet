import React, { useRef ,useState , useEffect} from "react";
import { Link , Navigate, useParams ,useNavigate, Routes, Route,BrowserRouter} from "react-router-dom";
import { All } from "./All";
import { Student } from "./Student";
import { useReactToPrint } from "react-to-print";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import {m } from "./Focus";

export function Report({nam}){
    
const printref=useRef();
    const navigate=useNavigate();
    const {id} =useParams();
    const [user,setuser]=useState()
    const print=useReactToPrint(
        {
            content:()=> printref.current,
            
        }
    );

    useEffect(()=>{
        console.log("name:",nam);
        setuser(nam);
    },[])

   
    const back=()=>{
        navigate('/meet/'+user);
    }

       return(
        <React.Fragment>
  <m.Consumer>
        {(e)=>{setuser(e)}}
        </m.Consumer>  
        
        <div className="layout">

            <div ref={printref} >
            <br></br>

           <All/>

</div>
<h2 style={{textAlign:"right"}}>
<Button className="but" onClick={print}  style={ {borderColor:"#28a4bd" , backgroundColor:"#28a4bd",}} >print </Button>  <span></span>
<Button className="but" onClick={back} style={ {borderColor:"#28a4bd" , backgroundColor:"#28a4bd",}}> Back to my account</Button>
</h2>
<br></br>
<br></br>
</div>
        </React.Fragment>
    )
}
