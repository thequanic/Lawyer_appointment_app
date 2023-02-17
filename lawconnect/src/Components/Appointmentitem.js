import React, { useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import AppContext from '../Context/appContext';



export default function Appointmentitem(props)
{
    const navigate=useNavigate();
    const {target,dateTime,appointmentOption,_id}=props;
    const context= useContext(AppContext);
    const {formatString,setView,user,deleteAppointment,confirmAppointment,rejectAppointment,completeAppointment}=context;

    const handleClick=(e)=>
    {
        if(user==="client")
        {
            setView({lawyer:target,lawyerOption:"confirmed"});
        }
        else if(user==="lawyer")
        {
            setView({client:target,clientOption:"appointment",_id:""})
        }
        navigate('/view');
    }

    const handleClick1=(e)=>
    {
        deleteAppointment(_id);
    }

    const handleClick2=(e)=>
    {
        confirmAppointment(_id);
    }

    const handleClick3=(e)=>
    {
        rejectAppointment(_id);
    }

    const handleClick4=(e)=>
    {
        completeAppointment(_id);
    }


    return(
        <div className=' col-md-6 col-lg-4'>
            <div className='card my-3'>
                <div className='my-card-body'>
                    <div className='card-text-block2'>
                                    <div className='card-title'>
                                    <span className="blue">Name:</span> {formatString(target.name)}
                                    </div>
                                    <div className='card-title'>
                                    <span className="blue">Email:</span> {target.email} 
                                    </div>
                                    <div className='card-title'>
                                        <span className="blue">Date:</span> {dateTime.substring(0,8)}  <span className="blue">Time:</span> {dateTime.substring(10,23)}
                                    </div>
                                    {user==="client"?
                                    <div className='card-title'>
                                    {appointmentOption==="confirmed"?
                                            <button className='btn btn-danger appointment-btn' onClick={handleClick1}>delete</button>
                                            :""
                                    }
                                    {appointmentOption==="requested"?
                                            <button className='btn btn-danger appointment-btn'onClick={handleClick1}>delete</button>
                                            :""
                                    }
                                    </div>
                                    :""

                                    }
                                    {user==="lawyer"?
                                    <div className='card-title'>
                                     {appointmentOption==="requested"?
                                     <button className='btn btn-dark appointment- mx-1'onClick={handleClick2}>confirm</button>
                                     :""
                                    }

                                    {appointmentOption==="requested"?
                                     <button className='btn btn-danger appointment-btn mx-1'onClick={handleClick3}>reject</button>
                                     :""
                                    }

                                    {appointmentOption==="confirmed"?
                                     <button className='btn btn-success appointment-btn'onClick={handleClick4}>complete</button>
                                     :""
                                    }
                                    </div>
                                    :""
                                    }
                                </div>
                    <button className='card-button-block2 btn-dark' onClick={handleClick}>
                        view >>
                    </button>
                </div>
            </div>
        </div>
    )
}