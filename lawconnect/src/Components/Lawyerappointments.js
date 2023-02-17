import React, { useContext, useEffect,useState } from 'react'
import AppContext from '../Context/appContext';
import Appointmentitem from './Appointmentitem';

export default function Lawyerappointments()
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
            //console.log("confirmed",confirmedAppointments);
            return (
                <>
                   {confirmedAppointments.map((appointment)=>{
                        return <Appointmentitem target={appointment.client_id} dateTime={appointment.datetime} _id={appointment._id} appointmentOption="confirmed"/>
                   })} 
                </>
            )
        }
        if(appointmentOption==="requested")
        {
            //console.log("requested",requestedAppointments);
            return (
                <>
                   {requestedAppointments.map((appointment)=>{
                        return <Appointmentitem target={appointment.client_id} dateTime={appointment.datetime} _id={appointment._id} appointmentOption="requested"/>
                   })} 
                </>
            )
        }
        if(appointmentOption==="deleted")
        {
            //console.log("deleted",deletedAppointments);
            return (
                <>
                   {deletedAppointments.map((appointment)=>{
                        return <Appointmentitem target={appointment.client_id} dateTime={appointment.datetime} _id={appointment._id} appointmentOption="deleted"/>
                   })} 
                </>
            )
        }
        if(appointmentOption==="rejected")
        {
            //console.log("rejecteded",rejectedAppointments);
            return (
                <>
                   {rejectedAppointments.map((appointment)=>{
                        return <Appointmentitem target={appointment.client_id} dateTime={appointment.datetime} _id={appointment._id} appointmentOption="rejected"/>
                   })} 
                </>
            )
        }
        if(appointmentOption==="completed")
        {
            //console.log("completed",completedAppointments);
            return (
                <>
                   {completedAppointments.map((appointment)=>{
                        return <Appointmentitem target={appointment.client_id} dateTime={appointment.datetime} _id={appointment._id} appointmentOption="completed"/>
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

                        <button className='lawyershead_button ' onClick={(e)=>{setAppointmentOption("confirmed")}}>Confirmed</button>
                    
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