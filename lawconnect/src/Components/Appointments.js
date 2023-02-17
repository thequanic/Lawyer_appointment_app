import React, { useContext, useEffect } from 'react'
import AppContext from '../Context/appContext';
import Clientappointments from './Clientappointments';
import Lawyerappointments from './Lawyerappointments';


export default function Appointments()
{
    const context= useContext(AppContext);
    const {fetchUserAppointments,user}=context;

    // useEffect( ()=>{
    //     fetchUserAppointments();
    // },[])

    return(
        <div className='connection'>
            {user==="client"?<Clientappointments/>:<Lawyerappointments/>}
           
        </div>
    )
}