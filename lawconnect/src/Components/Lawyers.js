import React, { useContext, useEffect,useState } from 'react'
import AppContext from '../Context/appContext';
import Lawyeritem from './Lawyeritem';


export default function Lawyers()
{
    
    const context= useContext(AppContext);
    const {confirmedConnections,fetchUserConnections,fetchClientNotConnections,requestedConnections,notConnectedLawyers,formatString}=context;

    useEffect( ()=>{
        fetchUserConnections();
        fetchClientNotConnections();
    },[])
    

    const [lawyerOption,setLawyerOption]=useState("connected");

    const getLawyerOption=()=>{
        if(lawyerOption==="connected")
        {
            return "Connected Lawyers";
        }
        if(lawyerOption==="requested")
        {
            return "Requested Lawyers";
        }
        if(lawyerOption==="civil")
        {
            return "Civil Lawyers";
        }
        if(lawyerOption==="criminal")
        {
            return "Criminal Lawyers";
        }
    }

    const setLawyerItems=()=>{
        if(lawyerOption==="connected")
        {
            return (
                <>
                   {confirmedConnections.map((connection)=>{
                        return <Lawyeritem lawyer={connection.lawyer_id} lawyerOption="confirmed"/>
                   })} 
                </>
            )
        }
        if(lawyerOption==="requested")
        {
            return (
                <>
                   {requestedConnections.map((connection)=>{
                        return <Lawyeritem lawyer={connection.lawyer_id} lawyerOption="requested"/>
                   })} 
                </>
            )
        }
        if(lawyerOption==="civil")
        {
            return (
                <>
                   {notConnectedLawyers.map((lawyer)=>{
                        if(formatString(lawyer.type)==="Civil"){
                        return <Lawyeritem lawyer={lawyer} lawyerOption="civil"/>}
                   })} 
                </>
            )
        }
        if(lawyerOption==="criminal")
        {
                return(
                    <>
                   {notConnectedLawyers.map((lawyer)=>{
                      
                        if(formatString(lawyer.type)==="Criminal"){
                        return <Lawyeritem lawyer={lawyer} lawyerOption="criminal"/>}
                   })} 
                </>
                )
        }
    }

    return(
        <div className='lawyers'>
          <div className='lawyershead'>
                        <div className='white lawyershead-title'>
                            {getLawyerOption()}
                        </div>

                        <button className='lawyershead_button ' onClick={(e)=>{setLawyerOption("criminal")}}>Criminal Lawyers</button>
                    
                        <button className='lawyershead_button ' onClick={(e)=>{setLawyerOption("civil")}}>Civil Lawyers</button>

                        <button className='lawyershead_button ' onClick={(e)=>{setLawyerOption("requested")}}>Requested Lawyers</button>
                  
                        <button className='lawyershead_button ' onClick={(e)=>{setLawyerOption("connected")}}>Connected Lawyers</button>
                  
          </div>
          <hr/>
          <div className='lawyersbody container'>
                <div className='row my-5'>
                {
                setLawyerItems()
                }
                </div>
          </div>
        </div>
    )
}