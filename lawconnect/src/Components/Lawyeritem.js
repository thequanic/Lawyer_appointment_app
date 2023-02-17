import React, { useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import AppContext from '../Context/appContext';



export default function Lawyeritem(props)
{
    const navigate=useNavigate();
    const {lawyer,lawyerOption}=props;
    const context= useContext(AppContext);
    const {formatString,setView}=context;

    const handleClick=(e)=>
    {
        setView({lawyer:lawyer,lawyerOption:lawyerOption});
        navigate('/view');
    }


    return(
        <div className='col-md-4 col-lg-3'>
            <div className='card my-3'>
                <div className='my-card-body'>
                    <div className='card-text-block'>
                                    <div className='card-title'>
                                        Name: {formatString(lawyer.name)}
                                    </div>
                                    <div className='card-title'>
                                        Experience: {lawyer.experience} Years
                                    </div>
                                    <div className='card-title'>
                                        Location: {formatString(lawyer.location)}
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