import React, { useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import AppContext from '../Context/appContext';


export default function Clientitem(props)
{
    const navigate=useNavigate();
    const {client,clientOption,_id}=props;
    const context= useContext(AppContext);
    const {formatString,setView}=context;

    const handleClick=(e)=>
    {
        setView({client:client,clientOption:clientOption,_id:_id});
        navigate('/view');
    }

    return(
        <div className='col-md-4 col-lg-3'>
            <div className='card my-3'>
                <div className='my-card-body'>
                    <div className='card-text-block'>
                                    <div className='card-title'>
                                        Name: {formatString(client.name)}
                                    </div>
                                    <div className='card-title'>
                                        Email: {client.email.substring(0,12)+"..."} 
                                    </div>
                                    <div className='card-title'>
                                        Adharr No.: {client.adharr_num}
                                    </div>
                                </div>
                    <button className='card-button-block btn-dark' onClick={handleClick}>
                        view >>
                    </button>
                </div>
            </div>
        </div>
    )
}