import React, { useState } from "react";
import {  Navigate, useParams ,useNavigate, Link} from "react-router-dom";
import users from './users.json'
import { Form ,Button } from "react-bootstrap";

export function Student(){
 const [student,setstudent]=useState(users);

console.log(student.id);


const nam = student.map(r=>{return(<h3 >{r.name}</h3>);  }) ; 
  const id= student.map(r=>{return(<h3 >{r.id}</h3>);  }) ; 
  const group = student.map(r=>{return(<h3 >{r.group}</h3>);  }) ;   

    return(
        <React.Fragment>
        <h3 style={{color:"violet"}}>STUDENTS </h3>
        <table>
<tr>   <th>id</th>
      <th>name</th>
      <th>En/not</th>   </tr>
<td>{id}</td>
<td>{nam}</td>
<td>{group}</td>
</table>
//check and radio button

<Form.Check inline label="student" type="radio" id="student" value="student"  name="group"

   /> 

<Form.Check inline label="teacher" type="radio" id="student" value="teacher"  name="group"

  />



</React.Fragment>
    )
}