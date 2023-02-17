import React, { useContext, useEffect } from 'react'
import AppContext from '../Context/appContext';
import Clientsignup from './Clientsignup';
import Lawyersingup from './Lawyersignup';


export default function Signup()
{
    const context= useContext(AppContext);
    const {user,setUser}=context;

    return(
        <div className='container signup-form'>
          
            <div className='loginhead'>
                <strong><h1 >Sign Up to use LawConnect</h1></strong>
               
            </div>
            <hr/>
            <div className='loginoptions'>
                <button  className={`btn Mybutton client-button ${user=="client"?"Mybutton-active":""}`} onClick={()=>setUser("client")}>Sign Up as Client</button>
                <button  className={`btn Mybutton lawyer-button ${user=="lawyer"?"Mybutton-active":""}`} onClick={()=>setUser("lawyer")}>Sign Up as Lawyer</button>
            </div>
            <hr/>
            {/*<p style={{color:"blue"}}>*scroll down to find submit button</p>*/}
            <div className='loginbody'>
                {user==="client"?<Clientsignup/>:<Lawyersingup/>}
            </div>
          
        </div>
    )
}