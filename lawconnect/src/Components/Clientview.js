import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import AppContext from '../Context/appContext';


export default function Clientview()
{
    const context= useContext(AppContext);
    const {deleteConnection,confirmConnection,rejectConnection,formatString,view}=context;
    const {client,clientOption,_id}=view;
    const [option,setOption]=useState(clientOption);
    const navigate=useNavigate();

    const handleClick1=(e)=>{
        deleteConnection(_id);
        navigate('/connections');
    }

    const handleClick2=(e)=>{
        confirmConnection(_id);
        setOption("confirmed");

    }

    const handleClick3=(e)=>{
        rejectConnection(_id);
        navigate('/connections');
    }


    return(
        <div className='clientprofile'>
            <div className='row profile-head'>
                <div className=" profile-col col-md-6">
                    <span className='blue'>Name:</span> {formatString(client.name)}
                </div>
                <div className=" profile-col col-md-6">
                <span className='blue'>Adharr Number:</span> {client.adharr_num}
                </div>
                <div className=" profile-col col-md-6">
                <span className='blue'>Email:</span> {client.email}
                </div>
                <div className="profile-col col-md-6">
                <span className='blue'>Profession:</span> {formatString(client.profession)}
                </div>
                
            </div>
            <hr/>
            {
                option==="confirmed"?<button className='btn btn-danger' onClick={handleClick1}>Delete Client</button>:""
            }
            {
                option==="requested"?
                <div className='row'>
                    <button className='btn btn-dark col-sm-6 col-lg-4 mx-2' onClick={handleClick2}>Confirm Connection</button>
                    <button className='btn btn-danger col-sm-6 col-lg-4 mx-2' onClick={handleClick3}>Reject Connection</button>
                </div>:""
            }
            {
                option==="deleted"?<h4 className='red'><strong>Deleted Connection</strong></h4>:""
            }
            {
                option==="appointment"?<h4 className='green'><strong>Appointment!</strong></h4>:""
            }
            <hr/>
            <div className='profile-body'>

                <h4><strong><span className='blue'>About:</span></strong></h4>
            
                {client.about}
            </div>
            <hr/>
        </div>
    )
}


