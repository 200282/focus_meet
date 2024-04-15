import React , {Component , useContext , useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { BrowserRouter,Router,Route, Routes } from "react-router-dom";
import { Sign } from "./Signup";
import { Login } from './Login';
import { Meet } from "./Meet";
import { Room } from "./Room";
import { Report } from "./Report";
import { All} from "./All";
import { Student } from "./Student";
export function Home(){


return(
<React.Fragment>

<BrowserRouter>
  
    <Routes>
<Route  path='/' element={<Meet/>}/>
<Route path="/signup" element={<Sign/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/room/:id" element={<Room/>}/>
<Route path="/room/:id/report" element={<Report/>}/>
<Route path="/room/:id/report/student" element={<Student/>}/>
<Route path="/room/:id/report/overall" element={<All/>}/>
    </Routes>
    
    </BrowserRouter>
    </React.Fragment>

)



}