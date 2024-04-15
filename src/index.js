import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Home } from './Focus';
import { Meet } from './Meet';
import { Room } from './Room';
import { Login } from './Login';
import { Sign } from './Signup';
import { VideoCall } from './Call';
import { BrowserRouter,Router,Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.Fragment>
    
    
    <Home />
    
  
  
 </React.Fragment>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
