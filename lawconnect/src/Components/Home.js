import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import appContext from '../Context/appContext';




export default function Home()
{
    const context=useContext(appContext);
    const {user} = context;
    console.log("user=",user);
    
    return(
        <div className='my-5'>
             <div className="homelink">
            
             <Link  className="lawconnect" to={(!localStorage.getItem('user'))?"/login":(user==="client"?"/connection":"/appointments")}><h1>{!localStorage.getItem('user')?"Lets Begin, Login Now>>>":(user==="client"?"Connect Lawyers >>>":"View Your Appointments >>>")}</h1></Link>
             
          
            </div>
         
        </div>
    )
}