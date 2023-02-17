import React, { useContext, useEffect, useRef,useState } from 'react'
import AppContext from '../Context/appContext';



export default function Appointmentmodal()
{
    const context= useContext(AppContext);
    const {addAppointment,view}=context;
    const {lawyer}=view;
    const [dateTime,setDateTime]=useState(null);

    const closeRef=useRef(null);

    const handleClick=(e)=>{
        e.preventDefault();
        addAppointment(lawyer._id,dateTime);
        closeRef.current.click();
    }

    return(
       <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"><strong>Request Appointment</strong></h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
     
     <div className="my-3">
     <form>

     <label htmlFor="datetime"><strong>Select Date and Time:</strong></label>
     
     <input type="datetime-local" id="datetime" name="datetime" onChange={(e)=>{console.log("datetime",e.target.value);setDateTime(e.target.value)}}/>
      
        
        
     </form> 
     
            </div>
            </div>
            <div className="modal-footer">
                <button ref={closeRef} type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-dark"  onClick={handleClick}>Request</button>
            </div>
            </div>
        </div>
    </div>
    )
}