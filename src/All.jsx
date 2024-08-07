import React , { useRef , useEffect, useState } from "react";
import {  Navigate, useParams ,useNavigate} from "react-router-dom";
import users from './users.json'
import reports from './reports.json'
import { Cell, Pie, PieChart , Legend, Line ,BarChart ,Bar} from "recharts";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button  , Card, CardGroup ,Col,Row, Table } from "react-bootstrap";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import {m } from "./Focus";

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



export function All({nam}){

    //const date=new Date();
    const printref=useRef();
    const {id} =useParams();
    const [data,setdata]=useState(reports)
    const navigate=useNavigate();
    const [user,setuser]=useState()
const [showen ,setshowen]=useState(false);
const [showeff ,setshoweff]=useState(false);
const [showbody ,setshowbody]=useState(false);
const [showtab ,setshowtab]=useState(false);
const room_id = data.map(r=>r.room_id);
const [host_name,sethost_name] =useState() ;
const [att,setatt] =useState() ;
const [created_at,setcreated_at] =useState() ;
const [ended_at,setended_at] =useState() ;
const [npar,setnpar]=useState() ;
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


const name=["shimaa","youssef"];
const eff=["90%","80%"];
const teff="85%"
const eng=["60%","70%"];
const teng="100%"
const bla=["60%","40%"]
const tbla="50%";
const iden=eff.map(r=>{return(<p >{r}</p>);  }) ;
const ide=eng.map(r=>{return(<p >{r}</p>);  }) ;
const idn=bla.map(r=>{return(<p >{r}</p>);  }) ;
const namen=name.map(r=>{return(<p>{r}</p>);  }) ;
const print=useReactToPrint(
    {
        content:()=> printref.current,
        
    }
);



useEffect(() => {
  console.log(id); 

  
  console.log("all:",nam); 
axios.get("http://localhost:3006/user/"+nam+"/"+id)
.then(res=>{
     console.log("data:",res.data);
sethost_name(res.data.room.host_name);
setcreated_at(res.data.room.created_at);
//setended_at(date);
setnpar(res.data.room.participants_ids.length);
//setatt(res.data.room.records.username);

}).catch(err=>{
    if(err)
        {console.log("error message : ", err);
            alert(err.response.data.message);
        }
});

},[]);
    


const sh_eff=()=>{
setshoweff((showeff)=>!showeff);
}
const sh_eng=()=>{
    setshowen((showen)=>!showen);
    }
    const sh_body=()=>{
        setshowbody((showbody)=>!showbody);
        }
        const sh_tab=()=>{
            setshowtab((showtab)=>!showtab);
            }


    const back=()=>{
        navigate('/meet/'+nam);
    }

    








    return(
    <React.Fragment>
         <m.Consumer>
        {(e)=>{setuser(e)}}
        </m.Consumer>
        <div className="layout">

<div ref={printref} >
<br></br>

        <br></br>
        <Row style={{margin:"1%" }}>

<Col style={{marginLeft:"4%" }}>
<div className="cir" style={{marginLeft:"10px", display:"inline-block" ,marginRight:"0px"}}>

</div>

<h1 style={{ display:"inline-block",marginLeft:"0px"}}> EnGauge</h1>
 <br></br>
<h8 style={{marginLeft:"10%" }}>EnGauge smarter ,</h8><br></br>
<h8 style={{marginLeft:"10%" }}> connect better</h8>
</Col>

<Col className="sum" style={{border:"dashed",borderColor:"#d4b7ea"  }}><h4 style={{color:"#28a4bd"}}><center>meeting summary</center></h4>
<p style={{fontSize:"large"}}>meeting ID : {id}</p>
<p style={{fontSize:"large"}}>host name : {host_name}</p>
<p style={{fontSize:"large"}}>started at : {created_at} </p>
<p style={{fontSize:"large"}}>number of participants : 2</p>

</Col>

</Row>


<br></br>


<Row  className="div" style={{ margin:"2%" ,marginLeft:"10%" ,marginRight:"10%" }}>
   <Col xs={2}>{!showeff &&
    <div className="butt"
     style={{backgroundColor:"#28a4bd" 
     ,borderColor:"#28a4bd" ,fontSize:"xx-large" 
     ,fontWeight:"bold" , }} 
     onClick={sh_eff}><center>+</center></div>}
     {showeff &&
    <div className="butt" style={{backgroundColor:"#28a4bd" ,borderColor:"#28a4bd" ,fontSize:"xx-large" ,fontWeight:"bold" }} onClick={sh_eff}><center>-</center></div>}
       </Col>
       <Col> <PieChart width={130} height={100} >
   
   <Pie data={eff_aten} labelLine={false} nameKey="class"   paddingAngle={1}  dataKey="num" outerRadius={40} innerRadius={20}  cx="50%" cy="50%" fill="#ffffff">
   {data.map((entry,index)=>(
       <Cell  key={`cell-${index}`} fill={colors[index % colors.length]} />
   ))}
   </Pie>
   </PieChart></Col>
   <Col className="per" style={{marginTop:"1.5%"}}>{teff}</Col>
   <Col ><p className="des">Effective attendance time</p></Col>
   
    </Row>
    {showeff&&<div style={{margin:"1%" ,marginLeft:"10%" ,marginRight:"10%"}}>
        <Table striped bordered hover  variant="dark"
        
        >
            <thead >
        <tr>   <th style={{backgroundColor:"#28a4bd"}}><center>name</center></th>
              <th style={{backgroundColor:"#28a4bd"}}><center>percentage</center></th>
             </tr>
             </thead >
             <tbody >
                <tr >
        <td><center>{namen}</center></td>
        <td><center>{iden}</center></td>
        </tr>
        </tbody>
        </Table>
        </div>
    }


    <Row className="div" style={{ margin:"2%" ,marginLeft:"10%" ,marginRight:"10%" }}>
   <Col xs={2}>{!showen &&
    <div className="butt" style={{backgroundColor:"#28a4bd" ,borderColor:"#28a4bd" ,fontSize:"xx-large" ,fontWeight:"bold" }} onClick={sh_eng}><center>+</center></div>}
     {showen &&
    <div className="butt" style={{backgroundColor:"#28a4bd" ,borderColor:"#28a4bd" ,fontSize:"xx-large" ,fontWeight:"bold" }} onClick={sh_eng}><center>-</center></div>}
       </Col>
       <Col> <PieChart width={130} height={100} >
   
   <Pie data={en} labelLine={false} nameKey="class"   paddingAngle={1}  dataKey="num" outerRadius={40} innerRadius={20}  cx="50%" cy="50%" fill="#ffffff">
   {data.map((entry,index)=>(
       <Cell  key={`cell-${index}`} fill={colors[index % colors.length]} />
   ))}
   </Pie>
   </PieChart></Col>
   <Col className="per" style={{marginTop:"1.5%"}}>{teng}</Col>
   <Col ><p className="des">Engagement level</p></Col>
   
    </Row>

    {showen&&<div    style={{margin:"1%" ,marginLeft:"10%" ,marginRight:"10%"}}>
        <Table striped bordered hover  variant="dark"
      
        >
            <thead >
        <tr>   <th style={{backgroundColor:"#28a4bd"}}><center>name</center></th>
              <th style={{backgroundColor:"#28a4bd"}}><center>percentage</center></th>
             </tr>
             </thead>
             <tbody>
                <tr>
        <td><center>{namen}</center></td>
        <td><center>{ide}</center></td>
        </tr>
        </tbody>
        </Table>
        </div>
    }



    <Row className="div" style={{ margin:"2%" ,marginLeft:"10%" ,marginRight:"10%"  }}>
   <Col xs={2}>{!showbody &&
    <div className="butt" style={{backgroundColor:"#28a4bd" ,borderColor:"#28a4bd" ,fontSize:"xx-large" ,fontWeight:"bold" }} onClick={sh_body}><center>+</center></div>}
     {showbody &&
    <div className="butt" style={{backgroundColor:"#28a4bd" ,borderColor:"#28a4bd" ,fontSize:"xx-large" ,fontWeight:"bold" }} onClick={sh_body}><center>-</center></div>}
       </Col>
       <Col> <PieChart width={130} height={100} >
   
   <Pie data={body} labelLine={false} nameKey="class"   paddingAngle={1}  dataKey="num" outerRadius={40} innerRadius={20}  cx="50%" cy="50%" fill="#ffffff">
   {data.map((entry,index)=>(
       <Cell  key={`cell-${index}`} fill={colors[index % colors.length]} />
   ))}
   </Pie>
   </PieChart></Col>
   <Col className="per" style={{marginTop:"1.5%"}}>{tbla}</Col>
   <Col ><p className="des">Body language says</p></Col>
   
    </Row>
    {showbody&&<div   style={{margin:"1%" ,marginLeft:"10%" ,marginRight:"10%"}}>
        <Table striped bordered hover  variant="dark"
        
        >
            <thead >
        <tr>   <th style={{backgroundColor:"#28a4bd"}}><center>name</center></th>
              <th style={{backgroundColor:"#28a4bd"}}><center>percentge</center></th>
             </tr>
             </thead>
             <tbody>
                <tr>
        <td><center>{namen}</center></td>
        <td><center>{idn}</center></td>
        </tr>
        </tbody>
        </Table>
        </div>
    }


   

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







/* 


 <Row className="div" style={{ margin:"2%" ,marginLeft:"10%" ,marginRight:"10%" }}>
   <Col xs={2}>{!showtab &&
    <div className="butt" style={{backgroundColor:"#28a4bd" ,borderColor:"#28a4bd" ,fontSize:"xx-large" ,fontWeight:"bold" }} onClick={sh_tab}><center>+</center></div>}
     {showtab &&
    <div className="butt" style={{backgroundColor:"#28a4bd" ,borderColor:"#28a4bd" ,fontSize:"xx-large" ,fontWeight:"bold" }} onClick={sh_tab}><center>-</center></div>}
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
    {showtab&&<div  style={{margin:"1%" ,marginLeft:"10%" ,marginRight:"10%"}}>
        <Table striped bordered hover  variant="dark"
        
        >
            <thead >
        <tr>   <th style={{backgroundColor:"#28a4bd"}}><center>name</center></th>
              <th style={{backgroundColor:"#28a4bd"}}><center>percentage</center></th>
             </tr>
             </thead>
             <tbody>
                <tr>
        <td><center>{iden}</center></td>
        <td><center>{namen}</center></td>
        </tr>
        </tbody>
        </Table>
        </div>
    }
*/