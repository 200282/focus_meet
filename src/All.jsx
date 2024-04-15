import React , { useEffect, useState } from "react";
import {  Navigate, useParams ,useNavigate} from "react-router-dom";
import users from './users.json'
import { Cell, Pie, PieChart , Legend, Line ,BarChart ,Bar} from "recharts";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button  , Card, CardGroup ,Col,Row, Table } from "react-bootstrap";

const r=Math.PI/180;
const l=({cx,cy,midAngle,innerRadius,outerRadius , percent ,index} )=>{
    const ra=innerRadius+(outerRadius-innerRadius)*0.5;
    const x=cx+ra* Math.cos(-midAngle*r);
    const y=cy+ra* Math.sin(-midAngle*r);

return(

    <text  fontSize={17}  x={x} y={y} fill="white" textAnchor={x>cx ?'start':'end'} dominantBaseline="central">
{`${(percent*100).toFixed(0)}%`}

    </text>
);};

const colors=['#964b9e','#74367a'];



export function All(){

const [showen ,setshowen]=useState(false);
const [shownen ,setshownen]=useState(false);

 useEffect(() => {
   
    
},[]);
    const [student,setstudent]=useState(users);
   const EN=student.filter(e=>e.group==='Engaged');
   const NEN=student.filter(e=>e.group==='Not Engaged');
const data=[
    {class:'Engaged' , num:EN.length},
    {class:'Not Engaged' , num:NEN.length}
];
const namen = EN.map(r=>{return(<h3 >{r.name}</h3>);  }) ; 
  const iden= EN.map(r=>{return(<h3 >{r.id}</h3>);  }) ; 
  const groupen = EN.map(r=>{return(<h3 >{r.group}</h3>);  }) ;   

  const namnen = NEN.map(r=>{return(<h3 >{r.name}</h3>);  }) ; 
  const idnen= NEN.map(r=>{return(<h3 >{r.id}</h3>);  }) ; 
  const groupnen = NEN.map(r=>{return(<h3 >{r.group}</h3>);  }) ;   



const sh=()=>{
setshowen((showen)=>!showen);
}
const shn=()=>{
    setshownen((shownen)=>!shownen);
    }




    return(
    <React.Fragment>


<h2 style={{color:"violet"}}>ALL RESULTS</h2>

<PieChart width={300} height={300} >
    <Legend layout="horizontal"  verticalAlign="top" align="center"  />

<Pie data={data} labelLine={false} nameKey="class"  label={l} paddingAngle={5}  dataKey="num" innerRadius={70}  cx="50%" cy="50%" fill="#964b9e" >
{data.map((entry,index)=>(
    <Cell  key={`cell-${index}`} fill={colors[index % colors.length]} />
))}
</Pie>
</PieChart>
<Row>
    <Col style={{backgroundColor:"#964b9e", color:"rgb(229, 218, 239)" , margin:"40px" , borderEndEndRadius:"20px"}}><h3>Engaged</h3>
    <h4>{EN.length}</h4>
    {!showen &&
    <Button style={{backgroundColor:"#964b9e" ,borderColor:"#964b9e"}} onClick={sh}>Show</Button>}
     {showen &&
    <Button style={{backgroundColor:"#964b9e" ,borderColor:"#964b9e"}} onClick={sh}>Hide</Button>}
       </Col>
    <Col style={{backgroundColor:"#74367a" ,color:"rgb(229, 218, 239)" , margin:"40px", borderEndEndRadius:"20px"}}><h3>Not Engaged</h3>
    <h4>{NEN.length}</h4>
    {!shownen&&
    <Button style={{backgroundColor:"#74367a" ,borderColor:"#74367a"}} onClick={shn}>Show</Button>}
     {shownen&&
    <Button style={{backgroundColor:"#74367a" ,borderColor:"#74367a"}} onClick={shn}>Hide</Button>}
    </Col>
</Row>
<Row>
    <Col> {showen&&<div>
        <Table striped bordered hover  variant="dark">
            <thead >
        <tr>   <th style={{backgroundColor:"rgb(195, 175, 223)"}}>id</th>
              <th style={{backgroundColor:"rgb(195, 175, 223)"}}>name</th>
             </tr>
             </thead>
             <tbody>
                <tr>
        <td>{iden}</td>
        <td>{namen}</td>
        </tr>
        </tbody>
        </Table>
        </div>
    }</Col>
    <Col> {shownen&&<div>
    <Table striped bordered hover  variant="dark">
            <thead >
        <tr>   <th style={{backgroundColor:"rgb(195, 175, 223)"}}>id</th>
              <th style={{backgroundColor:"rgb(195, 175, 223)"}}>name</th>
             </tr>
             </thead>
             <tbody>
                <tr>
        <td>{idnen}</td>
        <td>{namnen}</td>
        </tr>
        </tbody>
        </Table>
        
        </div>}</Col>
</Row>

</React.Fragment>
    )
}