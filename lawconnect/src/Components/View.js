import React, {useContext} from 'react'
import AppContext from '../Context/appContext';
import Clientview from './Clientview';
import Lawyerview from './Lawyerview';



export default function View()
{
    const context= useContext(AppContext);
    const {user}=context;

    return(
        <div className='myprofile'>
          <div className='container profile'>
            <hr/>
          {user==="lawyer"?<Clientview/>:<Lawyerview/>}
          </div>
        </div>
    )
}