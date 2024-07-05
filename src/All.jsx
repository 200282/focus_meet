import React , { useEffect, useState } from "react";
import {  Navigate, useParams ,useNavigate} from "react-router-dom";
import users from './users.json'
import reports from './reports.json'
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

const colors=['#28a4bd','##ffffff'];



export function All(){

    const {id} =useParams();
    const [data,setdata]=useState(reports)

const [showen ,setshowen]=useState(false);
const [shownen ,setshownen]=useState(false);
const room_id = data.map(r=>r.room_id);
const host_name = data.map(r=>r.host_name);
const date = data.map(r=>r.date);
const effective_attendance = data.map(r=>r.effective_attendance);
const yef =effective_attendance[0]*100;
const nef =100-yef;
const engagement_levels = data.map(r=>r.engagement_levels);

const yen=engagement_levels[0]*100;
const nen=100-yen;
const body_language = data.map(r=>r.body_language);
const ybl=body_language[0]*100;
const nbl=100-ybl;

const opened_tabs = data.map(r=>r.opened_tabs);
const no_open_tabs = data.map(r=>r.no_open_tabs); 
const ytab=(opened_tabs[0]/(opened_tabs[0]+no_open_tabs[0]))*100;
const eff_aten=[
    {class:'yes' , num:yef},
    {class:'no' , num:nef}
];

const en=[
    {class:'Engaged' , num:yen},
    {class:'Not Engaged' , num:nen}
];

const body=[
    {class:'true' , num:ybl},
    {class:'false' , num:nbl}
];

const tabs=[
    {class:'Engaged' , num:opened_tabs[0]},
    {class:'Not Engaged' , num:no_open_tabs[0]}
];

useEffect(() => {
  console.log(id); 
  console.log(room_id[0]);
  console.log(host_name[0]);
  
    
},[]);
    


const sh=()=>{
setshowen((showen)=>!showen);
}
const shn=()=>{
    setshownen((shownen)=>!shownen);
    }




    return(
    <React.Fragment>
        <br></br>
        <Row style={{margin:"1%" }}>

<Col style={{marginLeft:"4%" }}><div className="cir" style={{marginLeft:"10px", display:"inline-block"}}>
<br></br></div>
<h1 style={{ display:"inline-block",marginLeft:"2px"}}> EnGauge</h1>
 <br></br>
<h8 style={{marginLeft:"10%" }}>EnGauge smarter ,</h8><br></br>
<h8 style={{marginLeft:"10%" }}> connect better</h8>
</Col>

<Col className="sum" style={{border:"dashed",borderColor:"#d4b7ea"  }}><h4 style={{color:"#28a4bd"}}><center>meeting summary</center></h4>
<p style={{fontSize:"large"}}>meeting ID : {room_id[0]}</p>
<p style={{fontSize:"large"}}>Date : 5/7/2024 {date[0]}</p>
<p style={{fontSize:"large"}}>started at : 12:26 pm </p>
<p style={{fontSize:"large"}}>ended at : 1:38 pm</p>
<p style={{fontSize:"large"}}>number of participants : 30</p>

</Col>

</Row>
<br></br>


<Row  className="div" style={{ margin:"2%" ,marginLeft:"10%" ,marginRight:"10%" }}>
   <Col xs={2}>{!showen &&
    <div className="butt"
     style={{backgroundColor:"#28a4bd" 
     ,borderColor:"#28a4bd" ,fontSize:"xx-large" 
     ,fontWeight:"bold" , }} 
     onClick={sh}><center>+</center></div>}
     {showen &&
    <div className="butt" style={{backgroundColor:"#28a4bd" ,borderColor:"#28a4bd" ,fontSize:"xx-large" ,fontWeight:"bold" }} onClick={sh}><center>-</center></div>}
       </Col>
       <Col> <PieChart width={130} height={100} >
   
   <Pie data={eff_aten} labelLine={false} nameKey="class"   paddingAngle={1}  dataKey="num" outerRadius={40} innerRadius={20}  cx="50%" cy="50%" fill="#ffffff">
   {data.map((entry,index)=>(
       <Cell  key={`cell-${index}`} fill={colors[index % colors.length]} />
   ))}
   </Pie>
   </PieChart></Col>
   <Col className="per" style={{marginTop:"1.5%"}}>{yef}%</Col>
   <Col ><p className="des">Effective attendance time</p></Col>
   
    </Row>



    <Row className="div" style={{ margin:"2%" ,marginLeft:"10%" ,marginRight:"10%" }}>
   <Col xs={2}>{!showen &&
    <div className="butt" style={{backgroundColor:"#28a4bd" ,borderColor:"#28a4bd" ,fontSize:"xx-large" ,fontWeight:"bold" }} onClick={sh}><center>+</center></div>}
     {showen &&
    <div className="butt" style={{backgroundColor:"#28a4bd" ,borderColor:"#28a4bd" ,fontSize:"xx-large" ,fontWeight:"bold" }} onClick={sh}><center>-</center></div>}
       </Col>
       <Col> <PieChart width={130} height={100} >
   
   <Pie data={en} labelLine={false} nameKey="class"   paddingAngle={1}  dataKey="num" outerRadius={40} innerRadius={20}  cx="50%" cy="50%" fill="#ffffff">
   {data.map((entry,index)=>(
       <Cell  key={`cell-${index}`} fill={colors[index % colors.length]} />
   ))}
   </Pie>
   </PieChart></Col>
   <Col className="per" style={{marginTop:"1.5%"}}>{yen}%</Col>
   <Col ><p className="des">Engagement level</p></Col>
   
    </Row>



    <Row className="div" style={{ margin:"2%" ,marginLeft:"10%" ,marginRight:"10%"  }}>
   <Col xs={2}>{!showen &&
    <div className="butt" style={{backgroundColor:"#28a4bd" ,borderColor:"#28a4bd" ,fontSize:"xx-large" ,fontWeight:"bold" }} onClick={sh}><center>+</center></div>}
     {showen &&
    <div className="butt" style={{backgroundColor:"#28a4bd" ,borderColor:"#28a4bd" ,fontSize:"xx-large" ,fontWeight:"bold" }} onClick={sh}><center>-</center></div>}
       </Col>
       <Col> <PieChart width={130} height={100} >
   
   <Pie data={body} labelLine={false} nameKey="class"   paddingAngle={1}  dataKey="num" outerRadius={40} innerRadius={20}  cx="50%" cy="50%" fill="#ffffff">
   {data.map((entry,index)=>(
       <Cell  key={`cell-${index}`} fill={colors[index % colors.length]} />
   ))}
   </Pie>
   </PieChart></Col>
   <Col className="per" style={{marginTop:"1.5%"}}>{ybl}%</Col>
   <Col ><p className="des">Body language says</p></Col>
   
    </Row>



    <Row className="div" style={{ margin:"2%" ,marginLeft:"10%" ,marginRight:"10%" }}>
   <Col xs={2}>{!showen &&
    <div className="butt" style={{backgroundColor:"#28a4bd" ,borderColor:"#28a4bd" ,fontSize:"xx-large" ,fontWeight:"bold" }} onClick={sh}><center>+</center></div>}
     {showen &&
    <div className="butt" style={{backgroundColor:"#28a4bd" ,borderColor:"#28a4bd" ,fontSize:"xx-large" ,fontWeight:"bold" }} onClick={sh}><center>-</center></div>}
       </Col>
       <Col> <PieChart width={130} height={100} >
   
   <Pie data={tabs} labelLine={false} nameKey="class"   paddingAngle={1}  dataKey="num" outerRadius={40} innerRadius={20}  cx="50%" cy="50%" fill="#ffffff">
   {data.map((entry,index)=>(
       <Cell  key={`cell-${index}`} fill={colors[index % colors.length]} />
   ))}
   </Pie>
   </PieChart></Col>
   <Col className="per" style={{marginTop:"1.5%"}}>{ytab}%</Col>
   <Col ><p className="des">External tabs activity</p></Col>
   
    </Row>


<Row className="sum" style={{border:"dashed",borderColor:"#d4b7ea" ,margin:"1%" }}>
    <Col>
    <div className="c1" style={{marginLeft:"10px", display:"inline-block"}}></div>
    <div className="c2" style={{marginLeft:"10px", display:"inline-block"}}></div>
    <div className="c3" style={{marginLeft:"10px", display:"inline-block"}}></div>
    </Col>
    <Col><h4>please note</h4><p>this metrics are estimates
        and may not fully capture audience engagement. we encourage you 
        to seek direct feedback from your team / students for a more accurate
        assessment of the meeting's effectiveness and areas
        for improvement .
               
        </p></Col>
</Row>
<br></br>
  






</React.Fragment>
    )
}