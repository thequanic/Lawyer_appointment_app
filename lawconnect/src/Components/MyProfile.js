import React, {useContext} from 'react'
import AppContext from '../Context/appContext';
import Clientprofile from './Clientprofile';
import Lawyerprofile from './Lawyerprofile';


export default function MyProfile()
{
    const context= useContext(AppContext);
    const {user}=context;

    return(
        <div className='myprofile'>
          <div className='container profile'>
            <hr/>
          {user==="client"?<Clientprofile/>:<Lawyerprofile/>}
          </div>
        </div>
    )
}