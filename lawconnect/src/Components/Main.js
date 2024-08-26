import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Alert from './Alert'
import AppContext from '../Context/appContext';
import NavBar from './NavBar';
import Appointmentmodal from './Appointmentmodal';

export default function Main()
{
    const context= useContext(AppContext);
    const {alert,showAlert,setUser}=context;
 

    useEffect( ()=>{
        showAlert("Welcome to LawConnect... ","primary");
        setUser(localStorage.getItem('user')||'client');
    },[])

    return(
        <div>
             <div className='main'>
             <div className='fixed-top'>
               <NavBar/>
                {alert===null?<></>:<Alert alert={alert}/>}
                </div>
                <Appointmentmodal/>
             <Outlet/>
             </div>
        </div>
    )
}


