import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import appContext from '../Context/appContext';
// import AddPage from './AddPage';
// import Pages from './Pages'



export default function Home()
{
    const context=useContext(appContext);
    const {user} = context;
    
    return(
        <div className='my-5'>
             <div className="homelink">
             <Link  className="lawconnect" to={user==="client"?"/connection":"/appointments"}><h1>{user==="client"?"Connect Lawyers >>>":"View Your Appointments >>>"}</h1></Link>
             </div>
              
             {/* <Pages/> */}
        </div>
    )
}