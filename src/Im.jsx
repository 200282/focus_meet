import html2canvas from "html2canvas";
import React , {Component , useContext , useEffect, useState,useRef} from "react";




export function Im(){

  const [stream,setstream]=useState();
  const myvideo=useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(
      (stream)=>{
      
          if(myvideo.current){
         myvideo.current.srcObject = stream;
   console.log("stream  :  ",stream);
   setstream(stream);
     }});

  },[]);


  

  const take=()=>{
    const ele=document.getElementById("my");
    html2canvas(ele).then((c)=>{
        let image=c.toDataURL("image/jpeg");
        console.log("screeeeeeeeeen");
        console.log("image : ",image);
        console.log("image : ",typeof(image));
        const imm= image.replace("data:image/jpeg;base64,","");
        console.log("ccc: ",imm);
   //  const a=document.createElement("a");
   //   a.href=image;
   //  a.download="capture.jpeg";
  //    a.click();
    
    })
  }

 // setTimeout(take,10000);
//setInterval(take, 10000);


   return(<React.Fragment>
       <div  className="bv" style={{display:"inline-block",border:"solid",borderColor:"#d4b7ea",margin:"9px"}}>         
  <center><div >sara</div></center>
   
  
      <video    className="video"  id="my"
playsInline
muted
ref={myvideo}
autoPlay
style={{ width: "300px",margin:"3px" , display:"inline-block"}}


/>
</div>

<img></img>
<center>
<button onClick={take}>tack screen shot</button>

</center>


</React.Fragment>
    )}