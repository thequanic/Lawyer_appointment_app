import React, { useContext, useEffect,useState } from 'react'
import AppContext from '../Context/appContext';
import Appointmentitem from './Appointmentitem';


export default function Clientappointments()
{
    
    const context= useContext(AppContext);
    const {confirmedAppointments,requestedAppointments,rejectedAppointments,deletedAppointments,completedAppointments,fetchUserAppointments}=context;
    
    useEffect( ()=>{
        fetchUserAppointments();
    },[])

    const[appointmentOption,setAppointmentOption]=useState("confirmed");

    const getAppointmentOption=()=>{
        if(appointmentOption==="confirmed")
        {
            return "Confirmed Appointments";
        }
        if(appointmentOption==="requested")
        {
            return "Requested Appointments";
        }
        if(appointmentOption==="deleted")
        {
 
            return "Deleted Appointments";
        }
        if(appointmentOption==="rejected")
        {

            return "Rejected Appointments";
        }
        if(appointmentOption==="completed")
        {

            return "Completed Appointments";
        }
    }

    const setAppointmentItems=()=>{
        if(appointmentOption==="confirmed")
        {
            return (
                <>
                   {confirmedAppointments.map((appointment)=>{
                        return <Appointmentitem target={appointment.lawyer_id} dateTime={appointment.datetime} _id={appointment._id} appointmentOption="confirmed"/>
                   })} 
                </>
            )
        }
        if(appointmentOption==="requested")
        {
            return (
                <>
                   {requestedAppointments.map((appointment)=>{
                        return <Appointmentitem target={appointment.lawyer_id} dateTime={appointment.datetime} _id={appointment._id} appointmentOption="requested"/>
                   })} 
                </>
            )
        }
        if(appointmentOption==="deleted")
        {
            return (
                <>
                   {deletedAppointments.map((appointment)=>{
                        return <Appointmentitem target={appointment.lawyer_id} dateTime={appointment.datetime} _id={appointment._id} appointmentOption="deleted"/>
                   })} 
                </>
            )
        }
        if(appointmentOption==="rejected")
        {
            return (
                <>
                   {rejectedAppointments.map((appointment)=>{
                        return <Appointmentitem target={appointment.lawyer_id} dateTime={appointment.datetime} _id={appointment._id} appointmentOption="rejected"/>
                   })} 
                </>
            )
        }
        if(appointmentOption==="completed")
        {
            return (
                <>
                   {completedAppointments.map((appointment)=>{
                        return <Appointmentitem target={appointment.lawyer_id} dateTime={appointment.datetime} _id={appointment._id} appointmentOption="completed"/>
                   })} 
                </>
            )
        }
    }

    return(
        <div className='lawyers'>
          <div className='lawyershead'>
                        <div className='white lawyershead-title'>
                            {getAppointmentOption()}
                        </div>

                        <button className='lawyershead_button ' onClick={(e)=>{setAppointmentOption("completed")}}>Completed</button>

                        <button className='lawyershead_button ' onClick={(e)=>{setAppointmentOption("confirmed")}}>Confimred</button>
                    
                        <button className='lawyershead_button ' onClick={(e)=>{setAppointmentOption("requested")}}>Requested</button>

                        <button className='lawyershead_button ' onClick={(e)=>{setAppointmentOption("deleted")}}>Deleted</button>
                  
                        <button className='lawyershead_button ' onClick={(e)=>{setAppointmentOption("rejected")}}>Rejected</button>
                  
          </div>
          <hr/>
          <div className='lawyersbody container'>
                <div className='row my-5'>
                {
                setAppointmentItems()
                }
                </div>
          </div>
        </div>
    )
}