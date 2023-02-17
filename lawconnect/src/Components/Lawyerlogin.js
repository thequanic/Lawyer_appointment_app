import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import appContext from '../Context/appContext';


export default function Lawyerlogin()
{
    const context = useContext(appContext);
    const {showAlert,user}=context;

    const [cred,setCred] = useState({email:"",password:""});
    
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setCred({...cred,[e.target.name]:e.target.value})
  
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/lawyer/login/Lawyer",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email:cred.email,password:cred.password})

        }).catch(error=>{
            console.log("Internal Server Error");
            showAlert("Internal Server Error","danger")
            return;
        })

        const json= await response.json();

        //console.log(json);

        if(json.success){
            localStorage.setItem('token',json.authToken);
            localStorage.setItem('user',user);
            showAlert("Login Successful","success")
            navigate("/");
        }
        else{
            showAlert("Invalid Credentials","danger")
        }
    }


    return(
        <div className='container mt-3'>
           
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} required/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required minLength={5}/>
            </div>
            
            <button type="submit" className="btn btn-dark">Submit</button>
            </form>
        </div>
    )
}