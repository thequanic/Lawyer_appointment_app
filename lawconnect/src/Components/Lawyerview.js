import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import AppContext from '../Context/appContext';
import Appointmentmodal from './Appointmentmodal';


export default function Lawyerview()
{
    const context= useContext(AppContext);
    const {formatString,view,addConnection}=context;
    const {lawyer,lawyerOption}=view;
    const [option,setOption]=useState(lawyerOption);
    const navigate=useNavigate();


    const handleClick1=(e)=>{
        addConnection(lawyer._id);
        setOption("requested");
    }


    return(
        <>
       
        <div className='lawyerprofile'>
            <div className='row profile-head'>
                <div className=" profile-col col-md-6">
                    <span className='blue'>Name:</span> {formatString(lawyer.name)}
                </div>
                <div className=" profile-col col-md-6">
                <span className='blue'>Lawyer Id:</span> {lawyer.id_num}
                </div>
                {option==="confirmed"?<div className=" profile-col col-md-6">
                <span className='blue'>Email:</span> {lawyer.email}
                </div>:""}
                <div className="profile-col col-md-6">
                <span className='blue'>Location:</span> {formatString(lawyer.location)}
                </div>
                <div className="profile-col col-md-6">
                <span className='blue'>Experience:</span> {lawyer.experience} Years
                </div>
                <div className="profile-col col-md-6">
                <span className='blue'>Type:</span> {formatString(lawyer.type)}
                </div>
                
            </div>
            <hr/>
            {
                option==="civil"?<button className='btn btn-dark' onClick={handleClick1}>Add Connection</button>:""
            }
            {
                option==="criminal"?<button className='btn btn-dark' onClick={handleClick1}>Add Connection</button>:""
            }
            {
                option==="confirmed"?<button className='btn btn-dark'  data-bs-toggle="modal" data-bs-target="#exampleModal">Book Appointment</button>:""
            }
            {
                option==="requested"?<h4 className='green'><strong>Requested Connection</strong></h4>:""
            }
           
            <hr/>
            <div className='profile-body2'>

                <h4><strong><span className='blue'>About:</span></strong></h4>
            
                {lawyer.about}
            </div>
            <hr/>
        </div>
        </>
    )
}


