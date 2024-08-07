import React , {Component , useContext , useEffect, useState , createContext} from "react";
import { Link } from "react-router-dom";
import { BrowserRouter,Router,Route, Routes } from "react-router-dom";
import { Sign } from "./Signup";
import { Login } from './Login';
import { Meet } from "./Meet";
import { Room } from "./Room";
import { Report } from "./Report";
import { All} from "./All";
import { Student } from "./Student";
import { Cha } from './Cha';
import { My } from "./My";
import { Im} from "./Im";
export const m = createContext();

export function Home(){

const [nam,setnam]=useState('');
function getusername(d){
    setnam(d);
}
return(
<React.Fragment>
<m.Provider value={nam}>
<BrowserRouter>
  
    <Routes>
<Route  path='/' element={<Meet nam={nam}/>}/>
<Route path="/signup" element={<Sign/>}/>
<Route path="/login" element={<Login getusername={getusername}/>}/>
<Route path="/room/:id" element={<Room nam={nam} />}/>
<Route path="/chat" element={<Cha/>}/>
<Route path="/meet/:id" element={<My nam={nam}/>}/>
<Route path="/im" element={<Im/>}/>
<Route path="/room/:id/report/student" element={<Student/>}/>
<Route path="/room/:id/report" element={<All nam={nam}/>}/>
    </Routes>
  
    </BrowserRouter>
    </m.Provider>
    </React.Fragment>

)



}