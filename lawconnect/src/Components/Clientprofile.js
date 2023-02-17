import React, { useContext, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import AppContext from '../Context/appContext';


export default function Clientprofile()
{
    const context= useContext(AppContext);
    const {showAlert,fetchUserDetails,formatString,userView}=context;
    const navigate=useNavigate();

    useEffect( ()=>{
        showAlert("Welcome to your profile... ","primary");
        fetchUserDetails();
    },[])

    return(
        <div className='clientprofile'>
            <div className='row profile-head'>
                <div className=" profile-col col-md-6">
                    <span className='blue'>Name:</span> {formatString(userView.name)}
                </div>
                <div className=" profile-col col-md-6">
                <span className='blue'>Adharr Number:</span> {userView.adharr_num}
                </div>
                <div className=" profile-col col-md-6">
                <span className='blue'>Email:</span> {userView.email}
                </div>
                <div className="profile-col col-md-6">
                <span className='blue'>Profession:</span> {formatString(userView.profession)}
                </div>
                
            </div>
            <hr/>
            <button className='btn btn-dark' onClick={(e)=>{navigate('/appointments')}}>My appointments</button>
            <hr/>
            <div className='profile-body'>

                <h4><strong><span className='blue'>About:</span></strong></h4>
            
                {userView.about}
            </div>
            <hr/>
        </div>
    )
}


