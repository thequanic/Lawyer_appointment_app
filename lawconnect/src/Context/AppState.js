import AppContext from './appContext';
import React, { useState } from 'react';


const AppState = (props)=>{

    const host="localhost:5000";

/************************************************************************************************************* */
function formatString(str)
{
  if(str)
  {
    const arr=str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();

    }
    const str2 = arr.join(" ");
    return str2;
  }
  else
  {
    const str2=str;
    return str2;
  }
  
}
/************************************************************************************************************ */

       const[alert,setAlert]= useState(null);
       const showAlert=(message,type)=>{
       setAlert({
         msg:message,
         type:type
       })
   
       setTimeout(()=>{
         setAlert(null)
       },3000)
     }
/****************************************************************************************************************** */
   

     const [appointments,setAppointments]= useState([]);
     const [rejectedConnections,  setRejectedConnections]=useState([]);
     const [requestedConnections,  setRequestedConnections]=useState([]);
     const [confirmedConnections,  setConfirmedConnections]=useState([]);
     const [deletedConnections,  setDeletedConnections]=useState([]);
     const [notConnectedLawyers,setNotConnectedLawyers]=useState([]);
     const [requestedAppointments,  setRequestedAppointments]=useState([]);
     const [rejectedAppointments,  setRejectedAppointments]=useState([]);
     const [confirmedAppointments,  setConfirmedAppointments]=useState([]);
     const [deletedAppointments,  setDeletedAppointments]=useState([]);
     const [completedAppointments,  setCompletedAppointments]=useState([]);
     const [userView,setUserView]=useState({success:false});
     const [user,setUser]=useState("");

/************************************************************************************************************** */
const fetchClientDetails=async ()=>{
  const response= await fetch(`http://${host}/api/client/get/Client`,
  {
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
      },
      
      
  });
  const json= await response.json();
  //console.log(json);

  if(json.success)
  {
      const temp=json.client;
      setUserView({
        id:temp._id,
        name:temp.name,
        email:temp.email,
        adharr_num:temp.adharr_num,
        about:temp.about,
        profession:temp.profession 
      });
  }
  else
  {
    showAlert("Internal Server Error","danger");
  }

}

/************************************************************************************************************** */
const fetchLawyerDetails=async ()=>{
  const response= await fetch(`http://${host}/api/lawyer/get/Lawyer`,
  {
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
      },
      
      
  });
  const json= await response.json();
  //console.log(json);

  if(json.success)
  {
      const temp=json.lawyer;
      setUserView({
        id:temp._id,
        name:formatString(temp.name),
        email:temp.email,
        id_num:temp.id_num,
        about:temp.about,
        location:formatString(temp.location),
        experience:temp.experience,
        type:formatString(temp.type)
      });
  }
  else
  {
    showAlert("Internal Server Error","danger");
  }

}

/****************************************************************************************************** */
const fetchUserDetails=()=>{
   if(user==="client")
   {
      fetchClientDetails();
   }
   else if(user==="lawyer")
   {
      fetchLawyerDetails();
   }
}
/****************************************************************************************************************** */

const fetchClientNotConnections=async ()=>{
  const response= await fetch(`http://${host}/api/client/get/all/not/connected/Lawyers`,
  {
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
      },
      
      
  });
  const json= await response.json();
  //console.log(json);

  if(json.success)
  {
      const temp=json.lawyers;
      setNotConnectedLawyers(temp);
  }
  else
  {
    showAlert("Internal Server Error","danger");
  }

}
/************************************************************************************************************** */
const fetchClientConnections=async ()=>{
  const response= await fetch(`http://${host}/api/connection/client/fetch/all/connections`,
  {
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
      },
      
      
  });
  const json= await response.json();
  //console.log(json);

  if(json.success)
  {
      const temp=json.connection;
      let requested=[];
      let confirmed=[];
      let deleted=[];
      let rejected=[];
      
      temp.forEach(element => {
            
            if(element.deleted)
            {
              deleted.push(element);
            }
            else if(element.rejected)
            {
              rejected.push(element);
            }
            else if(element.confirm)
            {
              confirmed.push(element);
            }
            else
            {
               requested.push(element);
            }
      });

      setRequestedConnections(requested);
      setRejectedConnections(rejected);
      setDeletedConnections(deleted);
      setConfirmedConnections(confirmed);
  }
  else
  {
    showAlert("Internal Server Error","danger");
  }

}
/************************************************************************************************************** */
const fetchLawyerConnections=async ()=>{
  const response= await fetch(`http://${host}/api/connection/lawyer/fetch/all/connections`,
  {
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
      },
      
      
  });
  const json= await response.json();
  //console.log(json);

  if(json.success)
  {
      const temp=json.connection;
      let requested=[];
      let confirmed=[];
      let deleted=[];
      let rejected=[];
      
      temp.forEach(element => {
            
            if(element.deleted)
            {
              deleted.push(element);
            }
            else if(element.rejected)
            {
              rejected.push(element);
            }
            else if(element.confirm)
            {
              confirmed.push(element);
            }
            else
            {
               requested.push(element);
            }
      });

      setRequestedConnections(requested);
      setRejectedConnections(rejected);
      setDeletedConnections(deleted);
      setConfirmedConnections(confirmed);
  }
  else
  {
    showAlert("Internal Server Error","danger");
  }

}
/************************************************************************************************************** */
const fetchUserConnections=()=>{
  if(user==="client")
  {
    fetchClientConnections();
  }
  else if(user==='lawyer')
  {
    fetchLawyerConnections();
  }
}

/************************************************************************************************************** */
const fetchClientAppointments=async ()=>{
  const response= await fetch(`http://${host}/api/appointment/client/fetch/all/appointments`,
  {
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
      },
      
      
  });
  const json= await response.json();
  //console.log(json);

  if(json.success)
  {
      const temp=json.appointment.reverse();
      let requested=[];
      let confirmed=[];
      let deleted=[];
      let rejected=[];
      let completed=[];
      
      temp.forEach(element => {
            
            if(element.status)
            {
              completed.push(element);
            }
            else if(element.deleted)
            {
              deleted.push(element);
            }
            else if(element.rejected)
            {
              rejected.push(element);
            }
            else if(element.confirm)
            {
              confirmed.push(element);
            }
            else
            {
               requested.push(element);
            }
      });

      setRequestedAppointments(requested);
      setRejectedAppointments(rejected);
      setDeletedAppointments(deleted);
      setConfirmedAppointments(confirmed);
      setCompletedAppointments(completed);
  }
  else
  {
    showAlert("Internal Server Error","danger");
  }

}
/************************************************************************************************************** */
const fetchLawyerAppointments=async ()=>{
  const response= await fetch(`http://${host}/api/appointment/lawyer/fetch/all/appointments`,
  {
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
      },
      
      
  });
  const json= await response.json();
  //console.log(json);

  if(json.success)
  {
      const temp=json.appointment.reverse();
      let requested=[];
      let confirmed=[];
      let deleted=[];
      let rejected=[];
      let completed=[];
      
      temp.forEach(element => {
            
            if(element.status)
            {
              completed.push(element)
            }
            else if(element.deleted)
            {
              deleted.push(element);
            }
            else if(element.rejected)
            {
              rejected.push(element);
            }
            else if(element.confirm)
            {
              confirmed.push(element);
            }
            else
            {
               requested.push(element);
            }
      });

      setRequestedAppointments(requested);
      setRejectedAppointments(rejected);
      setDeletedAppointments(deleted);
      setConfirmedAppointments(confirmed);
      setCompletedAppointments(completed);


  }
  else
  {
    showAlert("Internal Server Error","danger");
  }

}
/************************************************************************************************************** */
const fetchUserAppointments=()=>{
  if(user==="client")
  {
    fetchClientAppointments();
  }
  else if(user==='lawyer')
  {
    fetchLawyerAppointments();
  }
}
/************************************************************************************************************** */
    const addConnection=async (lawyer_id)=>{
        const response= await fetch(`http://${host}/api/connection/client/add/connection`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({lawyer_id})
            
        });
        const json= await response.json();
        //console.log(json);

        if(json.success)
        {
          showAlert("Connection requested successfully","success");
            fetchUserConnections();
        }
        else
        {
          showAlert("Internal Server Error","danger");
        }

     }

/****************************************************************************************************** */
/************************************************************************************************************** */
const addAppointment=async (lawyer_id,datetime)=>{
  const response= await fetch(`http://${host}/api/appointment/client/add/appointment`,
  {
      method:'POST',
      headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
      },
      body:JSON.stringify({lawyer_id,datetime})
      
  });
  const json= await response.json();
  //console.log(json);

  if(json.success)
  {
      showAlert("Appointment requested successfully","success");
      fetchUserAppointments();
  }
  else
  {
    showAlert("Internal Server Error","danger");
  }

}

/****************************************************************************************************** */
const deleteAppointment=async(id)=>{
      const response= await fetch(`http://${host}/api/appointment/client/delete/appointment/${id}`,
      {
          method:'DELETE',
          headers:{
              'Content-Type':'application/json',
              "auth-token":localStorage.getItem('token')
          },
          
      })
      const json= await response.json();
      //console.log(json);

      if(json.success)
      {
          showAlert("Appointment deleted successfully","success");
          fetchUserAppointments();
      }
      else
      {
        showAlert("Internal Server Error","danger");
      }
  }


/****************************************************************************************************** */
const confirmConnection=async(id)=>{
  const response= await fetch(`http://${host}/api/connection/lawyer/confirm/connection/${id}`,
  {
      method:'PUT',
      headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
      },
      
  })
  const json= await response.json();
  //console.log(json);

  if(json.success)
  {
      showAlert("Connection confirmed successfully","success");
      fetchUserConnections();

  }
  else
  {
    showAlert("Internal Server Error","danger");
  }
}

/******************************************************************************************************** */
const rejectConnection=async(id)=>{
  const response= await fetch(`http://${host}/api/connection/lawyer/reject/connection/${id}`,
  {
      method:'PUT',
      headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
      },
      
  })
  const json= await response.json();
  //console.log(json);

  if(json.success)
  {
      showAlert("Connection rejected successfully","success");
      fetchUserConnections();
  
  }
  else
  {
    showAlert("Internal Server Error","danger");
  }
}

/****************************************************************************************************** */
const deleteConnection=async(id)=>{
  const response= await fetch(`http://${host}/api/connection/lawyer/delete/connection/${id}`,
  {
      method:'DELETE',
      headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
      },
      
  })
  const json= await response.json();
  //console.log(json);

  if(json.success)
  {
      showAlert("Connection deleted successfully","success");
      fetchUserConnections();
  }
  else
  {
    showAlert("Internal Server Error","danger");
  }
}

/****************************************************************************************************** */
const confirmAppointment=async(id)=>{
  const response= await fetch(`http://${host}/api/appointment/lawyer/confirm/appointment/${id}`,
  {
      method:'PUT',
      headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
      },
      
  })
  const json= await response.json();
  //console.log(json);

  if(json.success)
  {
      showAlert("Appointment confirmed successfully","success");
      fetchUserAppointments();
  }
  else
  {
    showAlert("Internal Server Error","danger");
  }
}

/******************************************************************************************************** */
const rejectAppointment=async(id)=>{
  const response= await fetch(`http://${host}/api/appointment/lawyer/reject/appointment/${id}`,
  {
      method:'PUT',
      headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
      },
      
  })
  const json= await response.json();
  //console.log(json);

  if(json.success)
  {
      showAlert("Appointment rejected successfully","success");
      fetchUserAppointments();
  }
  else
  {
    showAlert("Internal Server Error","danger");
  }
}

/************************************************************************************************************** */

const completeAppointment=async(id)=>{
  const response= await fetch(`http://${host}/api/appointment/lawyer/status/completed/appointment/${id}`,
  {
      method:'PUT',
      headers:{
          'Content-Type':'application/json',
          "auth-token":localStorage.getItem('token')
      },
      
  })
  const json= await response.json();
  //console.log(json);

  if(json.success)
  {
      fetchUserAppointments();
  }
  else
  {
    showAlert("Internal Server Error","danger");
  }
}

/************************************************************************************************************** */
const [view,setView]=useState(false);

/************************************************************************************************************ */

    return (
        <AppContext.Provider value={{
          user,
          setUser,
          alert,
          showAlert,
          appointments,
          setAppointments,
          rejectedConnections,  
          setRejectedConnections,
          requestedConnections,  
          setRequestedConnections,
          confirmedConnections,  
          setConfirmedConnections,
          deletedConnections,  
          setDeletedConnections,
          notConnectedLawyers,
          setNotConnectedLawyers,
          requestedAppointments,  
          setRequestedAppointments,
          rejectedAppointments,  
          setRejectedAppointments,
          confirmedAppointments,  
          setConfirmedAppointments,
          deletedAppointments,  
          setDeletedAppointments,
          completedAppointments,  
          setCompletedAppointments,
          userView,
          setUserView,
          fetchUserDetails,
          fetchUserAppointments,
          fetchUserConnections,
          confirmAppointment,
          confirmConnection,
          addAppointment,
          addConnection,
          rejectAppointment,
          rejectConnection,
          deleteAppointment,
          deleteConnection,
          completeAppointment,
          fetchClientNotConnections,
          view,
          setView,
          formatString
          }}>

            {props.children}

        </AppContext.Provider>
    )
}

export default AppState;