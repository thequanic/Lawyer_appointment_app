import React, { useContext, useEffect,useState } from 'react'
import AppContext from '../Context/appContext';
import Clientitem from './Clientitem';


export default function Clients()
{
    const context= useContext(AppContext);
    const {confirmedConnections,fetchUserConnections,requestedConnections,deletedConnections}=context;

    useEffect( ()=>{
        fetchUserConnections();
    },[])

    const [clientOption,setClientOption]=useState("confirmed");

    const getClientOption=()=>{
        if(clientOption==="confirmed")
        {
            return "Connected Clients";
        }
        if(clientOption==="requested")
        {
            return "Connection Requests";
        }
        if(clientOption==="deleted")
        {
            return "Deleted Clients";
        }

    }

    const setClientItems=()=>{
        if(clientOption==="confirmed")
        {
            return (
                <>
                   {confirmedConnections.map((connection)=>{
                        return <Clientitem client={connection.client_id} clientOption="confirmed" _id={connection._id} />
                   })} 
                </>
            )
        }
        if(clientOption==="requested")
        {
            return (
                <>
                   {requestedConnections.map((connection)=>{
                        return <Clientitem client={connection.client_id} clientOption="requested" _id={connection._id}  />
                   })} 
                </>
            )
        }
        if(clientOption==="deleted")
        {
            return (
                <>
                   {deletedConnections.map((connection)=>{
                        return <Clientitem client={connection.client_id} clientOption="deleted" _id={connection._id}  />
                   })} 
                </>
            )
        }
       
    }

    return(
        <div className='lawyers'>
          <div className='lawyershead'>
                        <div className='white lawyershead-title'>
                            {getClientOption()}
                        </div>

                        <button className='lawyershead_button ' onClick={(e)=>{setClientOption("confirmed")}}>Connected Clients</button>
                    
                        <button className='lawyershead_button ' onClick={(e)=>{setClientOption("requested")}}>Connection Requests</button>

                        <button className='lawyershead_button ' onClick={(e)=>{setClientOption("deleted")}}>Deleted Clients</button>
                
          </div>
          <hr/>
          <div className='lawyersbody container'>
                <div className='row my-5'>
                {
                setClientItems()
                }
                </div>
          </div>
        </div>
    )
}