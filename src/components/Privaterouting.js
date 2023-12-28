import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'
const Privaterouting = () =>{
    const auth = localStorage.getItem('token');
    return auth? <Outlet /> : <Navigate to='/' />   //it will only enable to navigate between pages if you are signed up or logged in    //it means if auth has value, then execute the Outlet, if not or otherwise navigate to signup page
}
export default Privaterouting;