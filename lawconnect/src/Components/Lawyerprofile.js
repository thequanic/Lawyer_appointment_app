import React, { useContext, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import AppContext from '../Context/appContext';


export default function Lawyerprofile()
{
    const context= useContext(AppContext);
    const {showAlert,fetchUserDetails,formatString,userView}=context;
    const navigate=useNavigate();

    useEffect( ()=>{
        fetchUserDetails();
        showAlert("Welcome to your profile... ","primary")
    },[])

    return(
        <div className='lawyerprofile'>
            <div className='row profile-head'>
                <div className=" profile-col col-md-6">
                    <span className='blue'>Name:</span> {formatString(userView.name)}
                </div>
                <div className=" profile-col col-md-6">
                <span className='blue'>Lawyer Id:</span> {userView.id_num}
                </div>
                <div className=" profile-col col-md-6">
                <span className='blue'>Email:</span> {userView.email}
                </div>
                <div className="profile-col col-md-6">
                <span className='blue'>Location:</span> {formatString(userView.location)}
                </div>
                <div className="profile-col col-md-6">
                <span className='blue'>Experience:</span> {userView.experience} Years
                </div>
                <div className="profile-col col-md-6">
                <span className='blue'>Type:</span> {formatString(userView.type)}
                </div>
                
            </div>
            <hr/>
            <button className='btn btn-dark' onClick={(e)=>{navigate('/appointments')}}>My appointments</button>
            <hr/>
            <div className='profile-body2'>

                <h4><strong><span className='blue'>About:</span></strong></h4>
            
                {userView.about}
            </div>
            <hr/>
        </div>
    )
}


