import React, {useContext} from 'react'
import AppContext from '../Context/appContext';
import Clientlogin from './Clientlogin';
import Lawyerlogin from './Lawyerlogin';


export default function Login()
{
    const context= useContext(AppContext);
    const {user,setUser}=context;

    return(
        <div className='container signup-form'>
          
            <div className='loginhead'>
                <strong><h1 >Log In to use LawConnect</h1></strong>
               
            </div>
            <hr/>
            <div className='loginoptions'>
                <button  className={`btn Mybutton client-button ${user==="client"?"Mybutton-active":""}`} onClick={()=>setUser("client")}>Log In as Client</button>
                <button  className={`btn Mybutton lawyer-button ${user==="lawyer"?"Mybutton-active":""}`} onClick={()=>setUser("lawyer")}>Log In as Lawyer</button>
            </div>
            <hr/>
            {/*<p style={{color:"blue"}}>*scroll down to find submit button</p>*/}
            <div className='loginbody'>
                {user==="client"?<Clientlogin/>:<Lawyerlogin/>}
            </div>
          
        </div>
    )
}