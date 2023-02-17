import React, { useContext, useEffect } from 'react'
import AppContext from '../Context/appContext';
import Lawyers from './Lawyers';
import Clients from './Clients';


export default function Connection()
{
    const context= useContext(AppContext);
    const {user}=context;


    return(
        <div className='connection'>
            {user==="client"?<Lawyers/>:<Clients/>}
           
        </div>
    )
}