import React, { useRef } from "react";
import { Link , Navigate, useParams ,useNavigate, Routes, Route,BrowserRouter} from "react-router-dom";
import { All } from "./All";
import { Student } from "./Student";
import { useReactToPrint } from "react-to-print";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";

export function Report(){
    
const printref=useRef();
    const navigate=useNavigate();
    const {id} =useParams();

    const print=useReactToPrint(
        {
            content:()=> printref.current,
            
        }
    );
    const back=()=>{
navigate('/room/'+id)
    }

       return(
        <React.Fragment>


<center>
    <h1>welcome to report page</h1>
</center >
            <div ref={printref} className="layout">


<All/>

</div>
<h2 style={{textAlign:"right"}}>
<Button className="but" onClick={print}  style={ {borderColor:"#000000"}} >print </Button>  <span></span>
<Button className="but" onClick={back} style={ {borderColor:"#000000"}}> back to room</Button>
</h2>
<br></br>
<br></br>
        </React.Fragment>
    )
}
